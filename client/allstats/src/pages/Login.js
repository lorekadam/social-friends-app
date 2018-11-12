import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { View } from 'react-native';
import * as colors from '../styled/colors';
import { Input } from '../styled/Input';
import { Button } from '../styled/Button';
import { Error } from '../styled/Error';
import { Success } from '../styled/Success';
import { Text } from '../styled/Text';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      success: false
    };
  }
  setValue = (name, val) => {
    this.setState({
      [name]: val
    });
  };
  render() {
    const { email, password, success } = this.state;
    return (
      <Mutation mutation={SIGNIN_MUTATION} variables={this.state}>
        {(signin, { error, loading }) => {
          return (
            <View>
              <Button
                title="Register page"
                onPress={() => this.props.navigation.navigate('Register')}
              />
              <Input
                value={email}
                onChangeText={(val) => this.setValue('email', val)}
                placeholder="Email"
              />
              <Input
                value={password}
                onChangeText={(val) => this.setValue('password', val)}
                placeholder="Password"
                secureTextEntry={true}
              />
              <Button
                title="Login"
                onPress={async () => {
                  const res = await signin();
                  if (res) {
                    this.setState({
                      email: '',
                      password: '',
                      success: true
                    });
                  }
                }}
              />
              {error && (
                <Error>
                  <Text color={colors.white}>
                    {error.message.replace('GraphQL error: ', '')}
                  </Text>
                </Error>
              )}
              {success && (
                <Success>
                  <Text color={colors.white}>Logged in!</Text>
                </Success>
              )}
            </View>
          );
        }}
      </Mutation>
    );
  }
}
