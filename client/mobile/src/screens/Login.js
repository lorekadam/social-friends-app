import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import { Container, Form, Item, Label, Input, Button, Content, Icon, Text } from 'native-base';
import { navChange } from '../actions/navigationActions';
import { api } from '../config/globals';

import * as types from '../actions/types';
import { authUser } from '../actions/userActions';

// import Axios from 'axios';

@connect()
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'lorekadam@interia.pl',
      password: '102587'
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
    Axios.post(`${api}login`, {
      email: this.state.email,
      password: this.state.password
    })
      .then((response) => {
        if (response.status === 200) {
          const data = {
            token: response.data.token,
            refreshToken: response.data.refreshToken
          };
          this.props.dispatch(authUser(data));
          this.props.dispatch(navChange(types.DASHBOARD_SCREEN));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.state.email} onChangeText={val => this.setEmail(val)} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input value={this.state.password} onChangeText={val => this.setPassword(val)} />
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
            onPress={() => this.props.dispatch(navChange(types.REGISTER_SCREEN))}
            full
            style={{ backgroundColor: '#000000' }}
          >
            <Text>Go To Register Screen</Text>
          </Button>
          <Button
            onPress={() => this.props.dispatch(navChange(types.DASHBOARD_SCREEN))}
            full
            style={{ backgroundColor: '#ab29f1' }}
          >
            <Text>Go protected DASHBOARD</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
