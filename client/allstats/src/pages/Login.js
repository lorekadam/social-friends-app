import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { View, AsyncStorage } from 'react-native';
import * as colors from '../styled/colors';
import { Input } from '../styled/Input';
import { Button } from '../styled/Button';
import { Error } from '../styled/Error';
import { Success } from '../styled/Success';
import { Text } from '../styled/Text';
import { facebookAppId } from '../../config';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
      jwt
    }
  }
`;

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'lorekkadam@gmail.com',
      password: '102587',
      success: false
    };
  }
  signInUser = async (jwt) => {
    return await AsyncStorage.setItem('user', jwt);
  };
  logInWithFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Expo.Facebook.logInWithReadPermissionsAsync(facebookAppId, {
        permissions: ['public_profile'],
        behavior: 'native'
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      console.log(message);
    }
  };
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
                  console.log('login begin');
                  const res = await signin();
                  if (res) {
                    await AsyncStorage.setItem('token', res.data.signin.jwt);
                    this.props.navigation.navigate('Profile');
                  }
                }}
              />
              <Button
                title="Login with Facebook"
                onPress={this.logInWithFacebook}
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
