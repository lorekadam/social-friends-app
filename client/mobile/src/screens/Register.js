import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import { Container, Form, Button, Content, Text, Label, Input, Item } from 'native-base';
import { navChange } from '../actions/navigationActions';
import { api } from '../config/globals';
import { authUser } from '../actions/userActions';

import * as types from '../actions/types';

@connect()
export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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

  submitRegister = () => {
    Axios.post(`${api}register`, {
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
            <Text>Register new account</Text>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input value={this.state.email} onChangeText={val => this.setEmail(val)} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                type="password"
                value={this.state.password}
                onChangeText={val => this.setPassword(val)}
              />
            </Item>
            <Button onPress={this.submitRegister} full style={{ backgroundColor: '#000000' }}>
              <Text>Register</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
