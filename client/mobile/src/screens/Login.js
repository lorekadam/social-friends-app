import React from 'react';

import {
  Container,
  Form,
  Item,
  Label,
  Input,
  Button,
  Content,
  Icon,
  Text
} from 'native-base';

export default class LoginScreen extends React.Component {
  navRegister = () => {};

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input />
            </Item>
            <Button iconLeft full>
              <Icon name="md-log-in" />
              <Text>Log in</Text>
            </Button>
          </Form>
          <Button iconLeft full style={{ backgroundColor: '#EA4335' }}>
            <Icon name="logo-google" />
            <Text>Google</Text>
          </Button>
          <Button iconLeft full style={{ backgroundColor: '#4267B2' }}>
            <Icon name="logo-facebook" />
            <Text>Facebook</Text>
          </Button>
          <Button
            onPress={this.navRegister}
            full
            style={{ backgroundColor: '#000000' }}
          >
            <Text>Register</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
