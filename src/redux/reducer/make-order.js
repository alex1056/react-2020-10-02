import { MAKE_ORDER, REQUEST, SUCCESS, FAILURE, REMOVE } from '../constants';
import { arrToMap } from '../utils';

const initialState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export default (state = initialState, action) => {
  const { type, payload, orderArr, response, error } = action;
  // console.log('action from make-order reducer=', action);
  // console.log('response from make-order reducer=', response);

  switch (type) {
    case MAKE_ORDER + REMOVE:
      return initialState;
    case MAKE_ORDER + REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MAKE_ORDER + SUCCESS:
      return {
        ...state,
        entities: response,
        loading: false,
        loaded: true,
      };
    case MAKE_ORDER + FAILURE:
      return {
        ...state,
        loading: false,
        loaded: false,
        error,
      };
    default:
      return state;
  }
};
