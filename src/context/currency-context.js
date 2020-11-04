import { createContext } from 'react';
// import { useState } from 'react';
const RUR = 'RUR';
const USD = 'USD';
const UAH = 'UAH';

export const currencyContext = createContext({
  currency: USD,
  changeCurrency: () => {},
});

// export const UserConsumer = userContext.Consumer;
// export const UserProvider = userContext.Provider;
