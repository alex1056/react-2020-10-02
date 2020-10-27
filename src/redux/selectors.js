import { createSelector } from 'reselect';
import { getById } from './utils';

const restaurantsSelector = (state) => state.restaurants.entities;
const productsSelector = (state) => state.products.entities;
export const reviewsSelector = (state) => state.reviews.entities;
const usersSelector = (state) => state.users.entities;

const orderSelector = (state) => state.order;

export const restaurantsLoadingSelector = (state) => state.restaurants.loading;
export const restaurantsLoadedSelector = (state) => state.restaurants.loaded;

export const productsLoadingSelector = (state, props) => {
  // state.products.loading[props.restaurantId];
  return state.products.loading[props.match.params.restId];
};

export const productsLoadedSelector = (state, props) => {
  // state.products.loaded[props.restaurantId];
  return state.products.loaded[props.match.params.restId];
};

export const reviewsLoadingSelector = (state, props) =>
  state.reviews.loading[props.restaurantId];
export const reviewsLoadedSelector = (state, props) => {
  try {
    if (props.match.params.restId) {
      return state.reviews.loaded[props.match.params.restId];
    }
  } catch (error) {
    return state.reviews.loaded[props.restaurantId];
  }
};

export const usersLoadingSelector = (state) => state.users.loading;
export const usersLoadedSelector = (state) => state.users.loaded;

export const orderProductsSelector = createSelector(
  productsSelector,
  orderSelector,
  (products, order) => {
    return Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.price,
      }));
  }
);

export const mapProductsToRestaurantsSelector = createSelector(
  orderSelector,
  restaurantsSelector,
  (products, restaurants) => {
    const restArr = Object.keys(restaurants).map(
      (restaurntId) => restaurants[restaurntId]
    );

    const mapProductsToRestaurant = Object.keys(products).map((productId) => {
      return restArr.reduce((acc, item) => {
        if (item.menu.includes(productId)) {
          if (acc === undefined) {
            acc = { [productId]: item.id };
            return acc;
          } else {
            acc = { ...acc, [productId]: item.id };
            return acc;
          }
        }
        return acc;
      }, {});
    });

    return mapProductsToRestaurant.reduce((acc, item) => {
      if (acc === undefined) {
        acc = { item };
        return acc;
      } else {
        acc = { ...acc, ...item };
        return acc;
      }
    }, {});
  }
);

export const productsRestaurantsSelector = createSelector(
  orderProductsSelector,
  mapProductsToRestaurantsSelector,
  (products, restaurants) =>
    products.map(({ product, amount, subtotal }) => {
      product = { ...product, restaurantId: restaurants[product.id] };
      return {
        product,
        amount,
        subtotal,
      };
    })
);

export const totalSelector = createSelector(
  orderProductsSelector,
  (orderProducts) =>
    orderProducts.reduce((acc, { subtotal }) => acc + subtotal, 0)
);

export const restaurantsListSelector = createSelector(
  restaurantsSelector,
  Object.values
);
export const productAmountSelector = getById(orderSelector, 0);
export const productSelector = getById(productsSelector);
const reviewSelector = getById(reviewsSelector);

export const reviewWitUserSelector = createSelector(
  reviewSelector,
  usersSelector,
  (review, users) => ({
    ...review,
    user: users[review.userId]?.name,
  })
);

export const averageRatingSelector = createSelector(
  reviewsSelector,
  (_, { reviews }) => reviews,
  (reviews, ids) => {
    const ratings = ids.map((id) => reviews[id]?.rating || 0);
    return Math.round(
      ratings.reduce((acc, rating) => acc + rating) / ratings.length
    );
  }
);

export const menuSelector = createSelector(
  restaurantsListSelector,
  (_, props) => {
    const restId = props.match.params.restId;
    return restId;
  },
  (restaurants, restId) =>
    restaurants.find((restaurant) => restaurant.id === restId).menu
);

export const restaurantReviewsSelector = createSelector(
  restaurantsListSelector,
  reviewsSelector,
  (_, props) => {
    const restId = props.match.params.restId;
    return restId;
  },

  (restaurants, reviews, restId) => {
    const restaurantReviews = restaurants.find(
      (restaurant) => restaurant.id === restId
    ).reviews;

    // const restaurantReviews = restaurants[restId].reviews;
    const revIdArr = Object.keys(reviews).filter((review) =>
      restaurantReviews.includes(review)
    );

    return revIdArr.reduce((acc, item) => {
      if (!acc) {
        return (acc = { [item]: reviews[item] });
      } else {
        acc = { ...acc, [item]: reviews[item] };
        return acc;
      }
    }, {});
  }
);
