import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ImageBackground, Image, AsyncStorage } from 'react-native';
import { View } from '../styled/View';
import colors from '../styled/colors';
import { Input } from '../styled/Input';
import { Button, TextButton } from '../styled/Buttons';
import { Error } from '../styled/Error';
import { Success } from '../styled/Success';
import { Text } from '../styled/Text';
import FacebookLogin from '../components/FacebookLogin';
import { emailValidation } from '../helpers/validations';

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

  setValue = (name, val) => {
    this.setState({
      [name]: val
    });
  };
  logIn = async (token) => {
    await AsyncStorage.setItem('token', token);
    this.props.navigation.navigate('Profile');
  };
  render() {
    const { email, password, success, loginLoading } = this.state;
    return (
      <Mutation mutation={SIGNIN_MUTATION} variables={this.state}>
        {(signin, { error, loading }) => {
          return (
            <ImageBackground
              source={require('../../assets/bg1.jpg')}
              style={{ width: '100%', height: '100%' }}
            >
              <View>
                <Image
                  source={require('../../assets/logo1.png')}
                  style={{ width: 280, height: 280 }}
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
                <TextButton
                  onPress={() => this.props.navigation.navigate('Register')}
                >
                  <Text color={colors.white} align="left">
                    Create account
                  </Text>
                </TextButton>
                <Button
                  title="Login"
                  disabled={
                    !(
                      password.length > 0 &&
                      email.length > 0 &&
                      emailValidation(email)
                    )
                  }
                  onPress={async () => {
                    const res = await signin();
                    if (res) {
                      await this.logIn(res.data.signin.jwt);
                    }
                  }}
                >
                  <Text color={colors.white}>Login</Text>
                </Button>
                <FacebookLogin logIn={this.logIn} />
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
            </ImageBackground>
          );
        }}
      </Mutation>
    );
  }
}
