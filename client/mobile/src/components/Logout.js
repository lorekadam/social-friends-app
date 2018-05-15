import React from 'react';

import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { unAuth } from '../actions/authActions';

import HalfButton from '../styled/HalfButton';

@connect()
export default class Logout extends React.Component {
  render() {
    return (
      <HalfButton onPress={() => this.props.dispatch(unAuth())}>
        <Icon name="log-out" />
      </HalfButton>
    );
  }
}
