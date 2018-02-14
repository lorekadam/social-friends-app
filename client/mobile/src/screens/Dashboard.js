import React from 'react';
import { connect } from 'react-redux';

import { Container, Button, Content, Text } from 'native-base';
import { navChange } from '../actions/navigationActions';

@connect()
export default class DashboardScreen extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Button
            onPress={() => this.props.dispatch(navChange('LOGIN_SCREEN'))}
            full
            style={{ backgroundColor: '#000000' }}
          >
            <Text>Go to login screen</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
