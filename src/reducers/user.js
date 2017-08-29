// @flow
import {LOG_OUT} from '../actions/user';

const initialState = {isLoggedIn: null};

export default (state = initialState, action: Object) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
