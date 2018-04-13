import React from 'react';

import { connect } from 'react-redux';
import { Container, Button, Icon } from 'native-base';
import { navChange } from '../actions/navigationActions';

import * as types from '../actions/types';

@connect()
export default class ScanStatistics extends React.Component {
  render() {
    return (
      <Container>
        <Button
          large
          onPress={() => this.props.dispatch(navChange(types.CAMERA_SCREEN))}
          style={{ backgroundColor: '#4630EB' }}
        >
          <Icon name="md-camera" style={{ fontSize: 50, color: '#ffffff' }} />
        </Button>
      </Container>
    );
  }
}
