import * as types from '../actions/types';
import { navChange } from './navigationActions';

export function authUser(data) {
  return {
    type: types.AUTH_USER,
    payload: {
      token: data.token,
      refreshToken: data.refreshToken
    }
  };
}

function logOutUser() {
  return {
    type: types.UNAUTH_USER
  };
}

export function unAuth() {
  return (dispatch) => {
    dispatch(logOutUser());
    dispatch(navChange(types.LOGIN_SCREEN));
  };
}
