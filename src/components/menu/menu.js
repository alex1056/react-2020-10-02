import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadProducts } from '../../redux/actions';
import {
  productsLoadingSelector,
  productsLoadedSelector,
  restaurantsListSelector,
  menuSelector,
} from '../../redux/selectors';

import Loader from '../loader';
import Product from '../product';
import Basket from '../basket';

import styles from './menu.module.css';

class Menu extends React.Component {
  static propTypes = {
    menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  };

  state = { error: null };

  loadProductsIfNeeded = () => {
    // const { loadProducts, restaurantId, loading, loaded, match } = this.props;
    const { loadProducts, loading, loaded, match, menu } = this.props;
    const { restId } = match.params;
    if (!loading && !loaded) {
      loadProducts(restId);
    }
  };

  componentDidMount() {
    this.loadProductsIfNeeded();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.restaurantId !== this.props.restaurantId) {
    if (prevProps.match.params.restId !== this.props.match.params.restId) {
      this.loadProductsIfNeeded();
      const { menu, loading, match } = this.props;
      // console.log('Из componentDidUpdate menu=', menu);
    }
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { menu, loading, loaded, match } = this.props;
    // console.log(this.props);
    // console.log('menu=', menu);
    // console.log('this.props=', this.props);
    // console.log('loading=, loaded,=', loading, loaded);
    // console.log(match.params.restId);
    if (loading) {
      return <Loader />;
    }

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    return (
      <div className={styles.menu}>
        <div>
          {menu.map((id) => (
            <Product key={id} id={id} />
          ))}
        </div>
        <div>
          <Basket />
        </div>
      </div>
    );
  }
}

export default connect(
  createStructuredSelector({
    loading: productsLoadingSelector,
    loaded: productsLoadedSelector,
    restaurants: restaurantsListSelector,
    menu: menuSelector,
  }),
  { loadProducts }
)(Menu);
