import * as types from '../actions/types';

export default function reducer(
  state = {
    error: '',
    authenticated: false,
    token: '',
    refreshToken: '',
    loader: false,
    loaderType: ''
  },
  action
) {
  switch (action.type) {
    case types.AUTH_USER: {
      return {
        ...state,
        authenticated: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken
      };
    }
    case types.UNAUTH_USER: {
      return {
        ...state,
        authenticated: false,
        token: '',
        refreshToken: ''
      };
    }
  }
  return state;
}
