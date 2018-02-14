import React from 'react';
import { connect } from 'react-redux';

import { Container, Form, Item, Label, Input, Button, Content, Icon, Text } from 'native-base';
import { navChange } from '../actions/navigationActions';
// import Axios from 'axios';

@connect()
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test',
      password: 'test'
    };
  }

  setEmail = (val) => {
    this.setState({
      email: val
    });
  };

  setPassword = (val) => {
    this.setState({
      password: val
    });
  };

  submitLogin = () => {
    console.log(this.state);
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.state.email} onChangeText={(val) => this.setEmail(val)} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input value={this.state.password} onChangeText={(val) => this.setPassword(val)} />
            </Item>
            <Button
              iconLeft
              full
              onPress={this.submitLogin}
              disabled={this.state.email.length === 0 || this.state.password.length === 0}
            >
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
            onPress={() => this.props.dispatch(navChange('REGISTER_SCREEN'))}
            full
            style={{ backgroundColor: '#000000' }}
          >
            <Text>Go To Register Screen</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
