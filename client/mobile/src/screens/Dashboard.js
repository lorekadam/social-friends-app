import React from 'react';
import { connect } from 'react-redux';

import { Container, Button, Content, Text } from 'native-base';
import { unAuth } from '../actions/authActions';

import ScanStatistics from '../components/ScanStatistics';

const styles = {
  flex: 1
};

// @Auth
@connect()
export default class DashboardScreen extends React.Component {
  render() {
    return (
      <Container style={styles}>
        <Content>
          <Button
            onPress={() => this.props.dispatch(unAuth())}
            full
            style={{ backgroundColor: '#000000' }}
          >
            <Text>Logout</Text>
          </Button>
          <ScanStatistics />
        </Content>
      </Container>
    );
  }
}
