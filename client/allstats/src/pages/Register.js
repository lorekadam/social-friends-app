import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ImageBackground, Image, AsyncStorage } from 'react-native';

import colors from '../styled/colors';
import { View } from '../styled/View';
import { Input } from '../styled/Input';
import { Button } from '../styled/Buttons';
import { Error } from '../styled/Error';
import { Success } from '../styled/Success';
import { Text } from '../styled/Text';
import BackButton from '../components/BackButton';
import { emailValidation, nameValidation } from '../helpers/validations';

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
            <ImageBackground
              source={require('../../assets/bg1.jpg')}
              style={{ width: '100%', height: '100%' }}
            >
              <View>
                <BackButton
                  navigation={() => this.props.navigation.navigate('Login')}
                />
                <Image
                  source={require('../../assets/logo1.png')}
                  style={{ width: 280, height: 280, marginBottom: 13 }}
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
                  disabled={
                    !(
                      name.length > 0 &&
                      nameValidation(name) &&
                      email.length > 0 &&
                      emailValidation(email) &&
                      password.length > 0
                    )
                  }
                  onPress={async () => {
                    const res = await signup();
                    if (res) {
                      console.log(res);
                      await AsyncStorage.setItem('token', res.data.signup.jwt);
                      this.props.navigation.navigate('Profile');
                    }
                  }}
                >
                  <Text color={colors.white}>Register</Text>
                </Button>
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
            </ImageBackground>
          );
        }}
      </Mutation>
    );
  }
}
