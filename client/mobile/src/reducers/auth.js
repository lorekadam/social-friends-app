import { AsyncStorage } from 'react-native';
import * as types from '../actions/types';
import { socket, closeSocket } from '../socket';

const _setUser = async (action) => {
  const user = {
    _id: action.payload._id,
    token: action.payload.token,
    refreshToken: action.payload.refreshToken
  };

  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

export default function reducer(
  state = {
    error: '',
    authenticated: false,
    token: '',
    refreshToken: '',
    loader: false,
    loaderType: '',
    _id: ''
  },
  action
) {
  switch (action.type) {
    case types.AUTH_USER: {
      _setUser(action);
      return {
        ...state,
        authenticated: true,
        ...action.payload
      };
    }
    case types.SET_USER_DATA: {
      return {
        ...state,
        authenticated: true,
        ...action.payload
      };
    }
    case types.UNAUTH_USER: {
      AsyncStorage.removeItem('user');
      closeSocket();
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
