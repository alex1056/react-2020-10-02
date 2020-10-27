import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Link, Route, NavLink } from 'react-router-dom';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import { connect } from 'react-redux';
import { averageRatingSelector } from '../../redux/selectors';
import styles from './restaurant.module.css';

const Restaurant = ({ id, name, menu, reviews, averageRating }) => {
  // const tabs = [
  //   { title: 'Menu', content: <Menu menu={menu} restaurantId={id} /> },
  //   {
  //     title: 'Reviews',
  //     content: <Reviews reviews={reviews} restaurantId={id} />,
  //   },
  // ];

  return (
    <div>
      <Banner heading={name}>
        {!!averageRating && <Rate value={averageRating} />}
      </Banner>
      {/* <Tabs tabs={tabs} /> */}
      <div className={styles.tabs}>
        <NavLink
          key="menu"
          to={`/restaurants/${id}/menu`}
          className={styles.tab}
          activeClassName={styles.active}
        >
          Menu
        </NavLink>
        <NavLink
          key="reviews"
          to={`/restaurants/${id}/reviews`}
          className={styles.tab}
          activeClassName={styles.active}
        >
          Reviews
        </NavLink>
      </div>
      {/* <div>{'Дошли сюда!'}</div> */}
      <Route exact path="/restaurants/:restId/" component={Menu} />
      <Route path="/restaurants/:restId/menu" component={Menu} />
      <Route path="/restaurants/:restId/reviews" component={Reviews} />
    </div>
  );
};

// Restaurant.propTypes = {
//   id: PropTypes.string,
//   name: PropTypes.string,
//   menu: PropTypes.array,
//   reviews: PropTypes.array,
//   averageRating: PropTypes.number,
// };

export default connect(
  createStructuredSelector({
    averageRating: averageRatingSelector,
  })
)(Restaurant);
