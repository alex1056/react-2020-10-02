import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Restaurant from '../restaurant';
import Tabs from '../tabs';

import { restaurantsListSelector } from '../../redux/selectors';

const Restaurants = (props) => {
  const { restaurants, match } = props;

  console.log('props from Restaurants=', props);
  let tabId = 'menu';

  if (props.match.path.includes('menu')) {
    tabId = 'menu';
  } else tabId = 'reviews';

  let { restId } = match.params;

  if (restaurants && restaurants.length > 0 && !restId) {
    restId = restaurants[0].id;
  }

  const restaurant = restaurants.find((restaurant) => restaurant.id === restId);

  const tabs = restaurants.map(({ id, name }) => ({
    title: name,
    to: `/restaurants/${id}/${tabId}`,
  }));

  return (
    <>
      <Tabs tabs={tabs} />

      <Switch>
        <Redirect
          exact
          from="/restaurants"
          to={`/restaurants/${restId}/menu`}
        />

        <Route
          exact
          path="/restaurants/:restId/menu"
          render={() => {
            return <Restaurant {...restaurant} match={match} />;
          }}
        />
        <Route
          exact
          path="/restaurants/:restId/reviews"
          render={() => {
            // setActiveTab('reviews');

            return <Restaurant {...restaurant} match={match} />;
          }}
        />
      </Switch>
    </>
  );
};

Restaurants.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default connect(
  createStructuredSelector({
    restaurants: restaurantsListSelector,
  })
)(Restaurants);
