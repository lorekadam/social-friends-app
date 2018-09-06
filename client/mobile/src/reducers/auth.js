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
        ...action.payload
      };
    }
    case types.UNAUTH_USER: {
      return {
        ...state,
        authenticated: false,
        token: '',
        refreshToken: '',
        _id: ''
      };
    }
  }
  return state;
}
