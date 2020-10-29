import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import logger from './middleware/logger';
import generateId from './middleware/generateId';
import api from './middleware/api';

import reducer from './reducer';
import history from '../history';

const enhancer = applyMiddleware(
  thunk,
  routerMiddleware(history),
  api,
  generateId,
  logger
);

export default createStore(reducer, composeWithDevTools(enhancer));
