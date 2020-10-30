import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Restaurants from '../components/restaurants';
import Loader from '../components/loader';
import {
  restaurantsListSelector,
  restaurantsLoadedSelector,
  restaurantsLoadingSelector,
} from '../redux/selectors';
import { loadRestaurants } from '../redux/actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

function RestaurantsPage(props) {
  const {
    // restaurants,
    loadRestaurants,
    loading,
    loaded,
    match,
    history,
  } = props;
  // console.log('props from Restaurants-page=', props);

  useEffect(() => {
    if (!loading && !loaded) loadRestaurants();
  }, []); // eslint-disable-line

  if (loading || !loaded) return <Loader />;

  if (match.isExact) {
    //если точное соответствие урла
    return (
      <>
        <Restaurants match={match} history={history} />
        {/* <h2 style={{ textAlign: 'center' }}>Select restaurant</h2> */}
      </>
    );
  } else {
    // если не точное соответствие урла
    // console.log('Restaurants page дает НЕточное соотвествие!');
    // return <Route path="/restaurants/:restId" component={Restaurants} />;
    return (
      <Switch>
        <Route exact path="/restaurants/:restId/menu" component={Restaurants} />
        <Route
          exact
          path="/restaurants/:restId/reviews"
          component={Restaurants}
        />
        <Route component={() => 'Error Page!'} />
        {/* <Route path="/restaurants/:restId" component={Restaurants} /> */}
      </Switch>
    );
  }
}

export default connect(
  createStructuredSelector({
    restaurants: restaurantsListSelector,
    loading: restaurantsLoadingSelector,
    loaded: restaurantsLoadedSelector,
  }),
  { loadRestaurants }
)(RestaurantsPage);
