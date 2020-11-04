import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { makeOrder, removeOrderStatus } from '../../redux/actions';
import styles from './basket.module.css';
import './basket.css';
import Loader from '../loader';

import BasketRow from './basket-row';
import BasketItem from './basket-item';
import Button from '../button';
import {
  orderProductsSelector,
  totalSelector,
  makeOrderSelector,
  makeOrderSelectorLoadingSelector,
  makeOrderSelectorLoadedSelector,
  makeOrderResponseSelector,
} from '../../redux/selectors';
import { UserConsumer } from '../../context/user-context';

function Basket({
  title = 'Basket',
  total,
  orderProducts,
  makeOrder,
  loading,
  loaded,
  response,
  removeOrderStatus,
}) {
  // console.log('makeOrder', makeOrder);
  // console.log('loading, loaded, response =', loading, loaded, response);
  // console.log('orderProducts =', orderProducts);
  // console.log('render Basket');
  // const { name } = useContext(userContext);
  if (!total) {
    return (
      <div className={styles.basket}>
        <h4 className={styles.title}>Select a meal from the list</h4>
      </div>
    );
  }

  let active;
  if (loading) active = { disabled: true };
  else active = {};
  // console.log('active=', active);

  if (response === 'ok') {
    // console.log('Заказ принят!');
    // removeOrderStatus();
    return <Redirect exact from="/checkout" to={`/thanks-for-order`} />;
  }

  return (
    <div className={styles.basket}>
      <h4 className={styles.title}>
        {/* {`${name}'s Basket`} */}
        {/* <UserConsumer children={({ name }) => `${name}'s Basket`} /> */}
        <UserConsumer>{({ name }) => `${name}'s Basket`}</UserConsumer>
      </h4>
      <TransitionGroup>
        {orderProducts.map(({ product, amount, subtotal, restaurantId }) => (
          <CSSTransition
            key={product.id}
            timeout={500}
            classNames="basket-item-animation"
          >
            <BasketItem
              product={product}
              amount={amount}
              subtotal={subtotal}
              restaurantId={restaurantId}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
      <hr className={styles.hr} />
      <BasketRow label="Sub-total" content={`${total} $`} />
      <BasketRow label="Delivery costs:" content="FREE" />
      <BasketRow label="total" content={`${total} $`} bold />
      <Link to="/checkout">
        <Button
          primary
          block
          {...active}
          onClick={() =>
            makeOrder([
              { id: 'd75f762a-eadd-49be-8918-ed0daa8dd024', amount: 5 },
              { id: 'd75f762a-eadd-49be-8918-ed0daa8dd024', amount: 11 },
            ])
          }
        >
          checkout
        </Button>
      </Link>
      {loading && <Loader />}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  total: totalSelector,
  orderProducts: orderProductsSelector,
  loading: makeOrderSelectorLoadingSelector,
  loaded: makeOrderSelectorLoadedSelector,
  response: makeOrderResponseSelector,
});

const mapDispatchToProps = (dispatch) => {
  return {
    makeOrder: (orderArr) => dispatch(makeOrder(orderArr)),
    removeOrderStatus: () => dispatch(removeOrderStatus()),
  };
};

/*
export default connect(
  createStructuredSelector({
    loading: productsLoadingSelector,
    loaded: productsLoadedSelector,
  }),
  { loadProducts }
)(Menu);
*/

export default connect(mapStateToProps, mapDispatchToProps)(Basket);
