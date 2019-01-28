import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import * as types from '../actions/types';

import { loginScreen, navChange } from '../actions/navigationActions';
import { setUserData } from '../actions/authActions';
import { initSocket } from '../socket';

export default function (ComposedComponent) {
  @connect(state => ({ authenticated: state.user.authenticated }))
  class Auth extends Component {
    componentWillMount() {
      if (!this.props.authenticated) {
        this.props.dispatch(loginScreen());
      }
      this._retrieveData();
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.dispatch(loginScreen());
      }
    }

    _retrieveData = async () => {
      const { dispatch } = this.props;
      const userFromStorage = await AsyncStorage.getItem('user');
      if (userFromStorage !== null) {
        dispatch(setUserData(JSON.parse(userFromStorage)));
        dispatch(navChange(types.DASHBOARD_SCREEN));
        initSocket();
      }
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return Auth;
}
