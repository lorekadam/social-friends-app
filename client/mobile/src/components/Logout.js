import React from 'react';

import { connect } from 'react-redux';
import { Button, Icon } from 'native-base';
import { unAuth } from '../actions/authActions';

@connect()
export default class Logout extends React.Component {
  render() {
    return (
      <Button large onPress={() => this.props.dispatch(unAuth())}>
        <Icon name="log-out" />
      </Button>
    );
  }
}
