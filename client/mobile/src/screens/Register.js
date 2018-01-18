import React from 'react';

import { Container, Button, Content, Text } from 'native-base';

export default class RegisterScreen extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Button full style={{ backgroundColor: '#000000' }}>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
