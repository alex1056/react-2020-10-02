import React from 'react';
import PropTypes from 'prop-types';
import Product from '../product';
import Basket from '../basket';
import { connect } from 'react-redux';
import styles from './menu.module.css';
import { loadProducts } from '../../redux/actions';
import { useEffect } from 'react';
import {
  productsListSelector,
  productsLoadedSelector,
  productsLoadingSelector,
} from '../../redux/selectors';
import Loader from '../loader';
import { arrToMap } from '../../redux/utils';

class Menu extends React.Component {
  // static propTypes = {
  //   menu: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  // };

  state = { error: null };

  // useEffect(() => {
  //   if (!loading && !loaded) loadRestaurants();
  // }, []); // eslint-disable-line

  componentDidMount() {
    console.log('Смонтировали компонент, Новый id ресторана=', this.props.id);
    // console.log('restaurantId=', this.props.restaurantId);
    this.props.loadProducts(this.props.id)
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  /*
  shouldComponentUpdate(nextProps) {
    console.log('this.props', this.props.id);
    console.log('nextProps', nextProps.id);
    if (this.props.id !== nextProps.id) {
      console.log('Update!');
      this.props.loadProducts(nextProps.id);
    }
    return true;
  }
*/


  render() {
    // console.log('menu-render, props=', this.props);

    // if (!this.props.loading && !this.props.loaded) this.props.loadProducts(this.props.id);
    console.log('restaurantId=', this.props.restaurantId);

    if (this.props.loading || !this.props.loaded) return <Loader />;


    const { menu } = this.props;

    if (this.state.error) {
      return <p>{this.state.error.message}</p>;
    }

    // console.log('Объект menu=', menu);

    return (
      <div className={styles.menu}>
        <div>
          {menu.map((item) => (
            <Product key={item.id} id={item.id} />
          ))}
        </div>
        <div>
          <Basket />
        </div>
      </div>
    );
  }
}



// binds on component re-rendering
//{/* <button onClick={() => this.props.toggleTodo(this.props.todoId)} /> */}

// binds on `props` change
// const mapDispatchToProps = (dispatch, ownProps) => {
//   toggleTodo: () => dispatch(toggleTodo(ownProps.todoId))
// }

// const mapStateToProps = (state, ownProps) => ({
//   todo: state.todos[ownProps.id]
// })


const mapStateToProps = (state, props) => ({
  restaurantId: props.restaurantId,
  menu: productsListSelector(state),
  // menu: state.products.entities,
  loading: productsLoadingSelector(state),
  loaded: productsLoadedSelector(state),
});

/*
export default connect(
  (state) => ({
    restaurants: restaurantsListSelector(state),
    loading: restaurantsLoadingSelector(state),
    loaded: restaurantsLoadedSelector(state),
  }),
  { loadRestaurants }
)(Restaurants);
*/


const mapDispatchToProps = (dispatch, ownProps) => ({
  loadProducts: () => dispatch(loadProducts(ownProps.id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);


// export default Menu;
