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
  Body
} from 'native-base';

import { navChange } from '../actions/navigationActions';
import { api } from '../config/globals';
import { authUser } from '../actions/userActions';

import * as types from '../actions/types';
import ErrorBlock from '../components/ErrorBlock';

@connect()
export default class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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

  submitRegister = () => {
    Axios.post(`${api}register`, {
      email: this.state.email,
      password: this.state.password
    })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          this.setState({
            error: res.data.msg
          });
        } else {
          const data = {
            token: res.data.token,
            refreshToken: res.data.refreshToken
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
          <Card>
            <CardItem>
              <Body>
                <Text>Register new account</Text>
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
              </Body>
            </CardItem>
          </Card>
          <Button
            onPress={this.submitRegister}
            full
            disabled={this.state.email.length === 0 && this.state.password.length > 3}
          >
            <Text>Register</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
