import React from 'react';
import PropTypes from 'prop-types';
import Review from './review';
import ReviewForm from './review-form';
import styles from './reviews.module.css';
import Loader from '../loader';
import { loadReviews, loadUsers } from '../../redux/actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import {
  reviewsListSelector,
  reviewsLoadedSelector,
  reviewsLoadingSelector,
} from '../../redux/selectors';

const Reviews = (props) => {
  const {
    reviews,
    restaurantId,
    loadReviews,
    loadUsers,
    loading,
    loaded,
  } = props;
  // console.log('Из комп. reviews props=', props);
  // console.log('Из комп. reviews props reviews=', reviews);
  useEffect(() => {
    loadReviews(restaurantId);
    loadUsers();
  }, [restaurantId]); // eslint-disable-line

  // console.log('loading,loaded', loading, loaded);
  if (loading || !loaded) return <Loader />;

  return (
    <div className={styles.reviews}>
      {reviews.map((item) => (
        <Review key={item.id} id={item.id} />
      ))}
      <ReviewForm restaurantId={restaurantId} />
    </div>
  );
};

// Reviews.propTypes = {
//   restaurantId: PropTypes.string.isRequired,
//   reviews: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
// };

const mapStateToProps = (state, props) => ({
  reviews: reviewsListSelector(state),
  loading: reviewsLoadingSelector(state),
  loaded: reviewsLoadedSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadUsers: () => dispatch(loadUsers()),
  loadReviews: () => dispatch(loadReviews(ownProps.restaurantId)),
});

// export default connect(null, { loadReviews })(Reviews);
export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
