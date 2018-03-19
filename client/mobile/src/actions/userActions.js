import * as types from '../actions/types';

export function authUser(data) {
  return {
    type: types.AUTH_USER,
    payload: {
      token: data.token,
      refreshToken: data.refreshToken
    }
  };
}
