import React from 'react';

import { Container, Button, Icon } from 'native-base';

import RunCamera from './RunCamera';

export default class ScanStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: false
    };
  }

  openCamera = () => {
    this.setState({ camera: true });
  };
  render() {
    return (
      <Container>
        <Button large onPress={this.openCamera} style={{ backgroundColor: '#4630EB' }}>
          <Icon name="md-camera" style={{ fontSize: 50, color: '#ffffff' }} />
        </Button>
        {this.state.camera && <RunCamera />}
      </Container>
    );
  }
}
