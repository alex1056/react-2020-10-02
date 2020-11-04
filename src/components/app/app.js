import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from '../header';
import Basket from '../basket';
import RestaurantsPage from '../../pages/restaurants-page';
import ThankOrder from '../thank-order';
// import { UserProvider } from '../../context/user-context';
import { currencyContext } from '../../context/currency-context';

export default () => {
  // const [name, setName] = useState('Igor');
  const [currency, setCurrency] = useState({ currency: 'USD+' });
  return (
    <div>
      {/* <UserProvider value={{ name, setName }}> */}
      <currencyContext.Provider
        value={{ currency, changeCurrency: setCurrency }}
      >
        <Header />
        {/* <Header onClick={() => setCurrency({ currency: 'RUR' })} /> */}
        <Switch>
          <Route path="/checkout" component={Basket} />
          <Route path="/restaurants" component={RestaurantsPage} />
          <Route path="/error" component={() => <h1>Error Page</h1>} />
          {/* <Route path="/" component={() => '404 - not found'} /> */}
          <Redirect exact from="/" to={`/restaurants`} />
          <Route exact path="/thanks-for-order" component={ThankOrder} />
        </Switch>
        {/* </UserProvider> */}
      </currencyContext.Provider>
    </div>
  );
};
