import React, { useContext, useState, useEffect } from 'react';

import Logo from './logo';
import styles from './header.module.css';
// import { userContext } from '../../context/user-context';
import { currencyContext } from '../../context/currency-context';

const Header = () => {
  // const { name, setName } = useContext(userContext);

  const { currency, changeCurrency } = useContext(currencyContext);
  console.log('1. currency, changeCurrency', currency, changeCurrency);

  useEffect(() => {
    // changeCurrency({ currency: 'RUR+' });
  });

  console.log('2. currency, changeCurrency', currency, changeCurrency);
  // // const [currency, setCurrency] = useState({
  //   currency: 'USD',
  //   changeCurrency,
  // });

  // console.log('2. currency, currencyLast', currency, currencyLast);

  return (
    // <header className={styles.header} onClick={() => setName('Lena')}>

    // <currencyContext.Provider value={{ currency }}>
    <header
      className={styles.header}
      onClick={() => changeCurrency({ currency: 'RUR+' })}
    >
      {/* <currencyContext.Consumer> */}
      {/* {(value) => <p>Посмотрим что получилось: {value.currency}</p>} */}
      {/* </currencyContext.Consumer> */}
      <Logo />
      {/* <h2>{name}</h2> */}
    </header>
    // </currencyContext.Provider>
  );
};

export default Header;
