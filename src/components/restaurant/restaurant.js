import React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Menu from '../menu';
import Reviews from '../reviews';
import Banner from '../banner';
import Rate from '../rate';
import Tabs from '../tabs';
import { connect } from 'react-redux';
import { averageRatingSelector } from '../../redux/selectors';
import { loadReviews } from '../../redux/actions';
import {
  reviewsListSelector,
  reviewsLoadedSelector,
  reviewsLoadingSelector,
} from '../../redux/selectors';

const Restaurant = (props) => {
  const {
    id,
    name,
    menu,
    reviews,
    averageRating,
    loadReviews,
    loading,
    loaded,
    restaurantIdState,
    setRestaurantId,
  } = props;

  // console.log('props в ресторан=', props);

  useEffect(() => {
    if (restaurantIdState !== id) {
      setRestaurantId(id);
      loadReviews(id);
    }
    if (!loading && !loaded) loadReviews(id);
  });

  const tabs = [
    { title: 'Menu', content: <Menu id={id} menu={menu} restaurantId={id} /> },
    {
      title: 'Reviews',
      content: <Reviews reviews={reviews} restaurantId={id} />,
    },
  ];

  return (
    <div>
      <Banner heading={name}>{/* <Rate value={averageRating} /> */}</Banner>
      <Tabs tabs={tabs} />
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  reviews: reviewsListSelector(state),
  loading: reviewsLoadingSelector(state),
  loaded: reviewsLoadedSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadReviews: () => dispatch(loadReviews(ownProps.id)),
});
// export default connect((state, props) => ({
//   // averageRating: averageRatingSelector(state, props),
//   averageRating: 1,
// }))(Restaurant);

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);
