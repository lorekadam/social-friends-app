import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import { Container, Form, Item, Label, Input, Button, Content, Icon, Text } from 'native-base';
import { navChange } from '../actions/navigationActions';
import { api } from '../config/globals';

import * as types from '../actions/types';
import { authUser } from '../actions/authActions';
import ErrorBlock from '../styled/ErrorBlock';

@connect()
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'lorekadam@interia.pl',
      password: '102587',
      error: ''
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
      .then((res) => {
        if (res.data.error) {
          this.setState({
            error: res.data.msg
          });
        } else {
          const { dispatch } = this.props;
          this.setState({
            error: ''
          });
          dispatch(authUser({ ...res.data }));
          dispatch(navChange(types.DASHBOARD_SCREEN));
        }
      })
      .catch((error) => {
        console.log(`Axios error => ${error}`);
      });
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input value={this.state.email} onChangeText={val => this.setEmail(val)} />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input value={this.state.password} onChangeText={val => this.setPassword(val)} />
            </Item>
            {this.state.error.length > 0 && <ErrorBlock message={this.state.error} />}
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
