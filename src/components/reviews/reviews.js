import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';

import { loadReviews, loadUsers } from '../../redux/actions';
import { connect } from 'react-redux';
import {
  reviewsLoadedSelector,
  usersLoadedSelector,
  reviewsSelector,
  restaurantReviewsSelector,
} from '../../redux/selectors';

import Loader from '../loader';

const Reviews = (props) => {
  const {
    reviews,
    restaurantId,
    loadReviews,
    loadUsers,
    usersLoaded,
    reviewsLoaded,
    match,
  } = props;
  // console.log('props from begining of comp reviews=', props);
  const { restId } = match.params;
  useEffect(() => {
    loadUsers();
    loadReviews(restId);
    // console.log('props from useEffect=', props);
  }, [restId]); // eslint-disable-line

  if (!usersLoaded || !reviewsLoaded) return <Loader />;
  // console.log('reviews=', reviews);
  return (
    <div className={styles.reviews}>
      {Object.keys(reviews).map((id) => (
        <Review key={id} id={id} />
      ))}
      <ReviewForm restaurantId={restId} />
    </div>
  );
};

// Reviews.propTypes = {
//   restaurantId: PropTypes.string.isRequired,
//   reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
// };

const mapStateToProps = createStructuredSelector({
  reviewsLoaded: reviewsLoadedSelector,
  usersLoaded: usersLoadedSelector,
  // reviews: reviewsSelector,
  reviews: restaurantReviewsSelector,
  // rev1: restaurantReviewsSelector,
});

export default connect(mapStateToProps, { loadReviews, loadUsers })(Reviews);
