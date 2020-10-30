import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { makeOrder, removeOrderStatus } from '../../redux/actions';
// import styles from './basket.module.css';
// import './basket.css';
import Loader from '../loader';

// import BasketRow from './basket-row';
// import BasketItem from './basket-item';
// import Button from '../button';
import {
  orderProductsSelector,
  totalSelector,
  makeOrderSelector,
  makeOrderSelectorLoadingSelector,
  makeOrderSelectorLoadedSelector,
  makeOrderResponseSelector,
} from '../../redux/selectors';
// import { UserConsumer } from '../../context/user-context';

function ThankOrder({
  // title = 'Basket',
  // total,
  // orderProducts,
  // makeOrder,
  // loading,
  // loaded,
  response,
  removeOrderStatus,
}) {
  useEffect(() => {
    removeOrderStatus();
  });

  return (
    <div>
      <h1>Спасибо за заказ, ждем снова!</h1>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  // total: totalSelector,
  // orderProducts: orderProductsSelector,
  // loading: makeOrderSelectorLoadingSelector,
  // loaded: makeOrderSelectorLoadedSelector,
  response: makeOrderResponseSelector,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // makeOrder: (orderArr) => dispatch(makeOrder(orderArr)),
    removeOrderStatus: () => dispatch(removeOrderStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankOrder);
