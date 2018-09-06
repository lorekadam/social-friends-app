import React from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import {
  Container,
  Button,
  Content,
  Text,
  Label,
  Input,
  Item,
  Card,
  CardItem,
  Body,
  Form
} from 'native-base';

import { navChange } from '../actions/navigationActions';
import { api } from '../config/globals';
import { authUser } from '../actions/authActions';

import * as types from '../actions/types';
import ErrorBlock from '../styled/ErrorBlock';

@connect()
export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: ''
    };
  }

  setUsername = (val) => {
    this.setState({
      username: val
    });
  };

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
      username: this.state.username,
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
        console.log(error);
      });
  };
  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input value={this.state.username} onChangeText={val => this.setUsername(val)} />
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input value={this.state.email} onChangeText={val => this.setEmail(val)} />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input
                password
                value={this.state.password}
                onChangeText={val => this.setPassword(val)}
              />
            </Item>
            {this.state.error.length > 0 && <ErrorBlock message={this.state.error} />}
            <Button
              onPress={this.submitRegister}
              full
              disabled={this.state.email.length === 0 && this.state.password.length > 3}
            >
              <Text>Register</Text>
            </Button>
            <Button
              onPress={() => this.props.dispatch(navChange(types.LOGIN_SCREEN))}
              full
              style={{ backgroundColor: '#000000' }}
            >
              <Text>Go To Login Screen</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
