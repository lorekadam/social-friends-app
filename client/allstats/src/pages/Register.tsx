import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ImageBackground, AsyncStorage } from 'react-native';
import { emailValidation, nameValidation } from '../utils/validations';
import colors from '../styled/colors';
import { PaddingView } from '../styled/View';
import { Input } from '../styled/Input';
import { Button } from '../styled/Buttons';
import { Text } from '../styled/Text';
import BackButton from '../components/BackButton';
import { NavigationScreenProp } from 'react-navigation';
import Loader from '../components/Loader';
import QLNotifications from '../components/QLNotifications';
import Logo from '../components/Logo';
import { LOGIN_PAGE } from '../navigation/pageTypes';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  name: string;
  email: string;
  password: string;
  success: string;
}

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

export default class RegisterPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      success: ''
    };
  }
  setValue = (name: keyof State, val: string) => {
    this.setState({
      [name]: val
    } as any);
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
              <PaddingView>
                {loading ? (
                  <Loader />
                ) : (
                  <React.Fragment>
                    <BackButton path={LOGIN_PAGE} />
                    <Logo style={{ marginBottom: 13 }} />
                    <Input
                      value={name}
                      onChangeText={(val: string) => this.setValue('name', val)}
                      placeholder="Name"
                    />
                    <Input
                      value={email}
                      onChangeText={(val: string) =>
                        this.setValue('email', val)
                      }
                      placeholder="Email"
                    />
                    <Input
                      value={password}
                      onChangeText={(val: string) =>
                        this.setValue('password', val)
                      }
                      placeholder="Password"
                      secureTextEntry={true}
                    />
                    <Button
                      full
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
                          await AsyncStorage.setItem(
                            'token',
                            res.data.signup.jwt
                          );
                          this.props.navigation.navigate('Profile');
                        }
                      }}
                    >
                      <Text color={colors.white}>Register</Text>
                    </Button>
                    <QLNotifications
                      error={error}
                      success={success}
                      message={error ? error.message : 'User created'}
                    />
                  </React.Fragment>
                )}
              </PaddingView>
            </ImageBackground>
          );
        }}
      </Mutation>
    );
  }
}
