import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { View, AsyncStorage } from 'react-native';
import * as colors from '../styled/colors';
import { Input } from '../styled/Input';
import { Button } from '../styled/Buttons';
import { Error } from '../styled/Error';
import { Success } from '../styled/Success';
import { Text } from '../styled/Text';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
      jwt
    }
  }
`;

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
    const { name, email, password, success } = this.state;
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => {
          return (
            <View>
              <Button
                title="Login page"
                onPress={() => this.props.navigation.navigate('Login')}
              />
              <Input
                value={name}
                onChangeText={(val) => this.setValue('name', val)}
                placeholder="Name"
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
                title="Register"
                onPress={async () => {
                  const res = await signup();
                  if (res) {
                    await AsyncStorage.setItem('token', res.data.signup.jwt);
                    this.props.navigation.navigate('Profile');
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
                  <Text color={colors.white}>User created</Text>
                </Success>
              )}
            </View>
          );
        }}
      </Mutation>
    );
  }
}
