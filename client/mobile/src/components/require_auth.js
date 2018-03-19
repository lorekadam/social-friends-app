import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginScreen } from '../actions/navigationActions';

export default function (ComposedComponent) {
  @connect(state => ({ authenticated: state.user.authenticated }))
  class Auth extends Component {
    componentWillMount() {
      console.log('auth');
      if (!this.props.authenticated) {
        this.props.dispatch(loginScreen());
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.dispatch(loginScreen());
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  return Auth;
}
