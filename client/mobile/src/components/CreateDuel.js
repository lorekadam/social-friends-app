import React from 'react';

import { connect } from 'react-redux';
import { Button, Icon } from 'native-base';

import { navChange } from '../actions/navigationActions';
import * as types from '../actions/types';

@connect()
export default class CreateDuel extends React.Component {
  render() {
    return (
      <Button large onPress={() => this.props.dispatch(navChange(types.CAMERA_SCREEN))}>
        <Icon name="trophy" />
      </Button>
    );
  }
}
