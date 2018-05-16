import React from 'react';

import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { navChange } from '../actions/navigationActions';

import * as types from '../actions/types';

import HalfButton from '../styled/HalfButton';

@connect()
export default class ScanStatistics extends React.Component {
  render() {
    return (
      <HalfButton
        bgcolor="#abc145"
        onPress={() => this.props.dispatch(navChange(types.CAMERA_SCREEN))}
      >
        <Icon name="md-camera" />
      </HalfButton>
    );
  }
}
