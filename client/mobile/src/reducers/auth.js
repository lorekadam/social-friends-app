import { AsyncStorage } from 'react-native';
import * as types from '../actions/types';
import { closeSocket } from '../socket';

const _setUser = async (action) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify({ ...action.payload }));
  } catch (error) {
    console.log(error);
  }
};

export default function reducer(
  state = {
    error: '',
    auth: false,
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
        ...action.payload
      };
    }
    case types.SET_USER_DATA: {
      return {
        ...state,
        ...action.payload
      };
    }
    case types.UNAUTH_USER: {
      AsyncStorage.removeItem('user');
      closeSocket();
      return {
        ...state,
        auth: false,
        token: '',
        refreshToken: '',
        _id: ''
      };
    }
  }
  return state;
}
