import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { NavigationScreenProp } from 'react-navigation';
import gql from 'graphql-tag';
import { ImageBackground, AsyncStorage } from 'react-native';
import { PaddingView } from '../styled/View';
import colors from '../styled/colors';
import { Input } from '../styled/Input';
import { Button, TextButton } from '../styled/Buttons';
import { Text } from '../styled/Text';
import FacebookLogin from '../components/FacebookLogin';
import { emailValidation } from '../utils/validations';
import { Row, Col, RowColumn, ColColumn } from '../styled/Grid';
import Loader from '../components/Loader';
import QLNotifications from '../components/QLNotifications';
import Logo from '../components/Logo';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  email: string;
  password: string;
  success: string;
}

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

export default class LoginPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: 'lorekkadam@gmail.com',
      password: '102587',
      success: ''
    };
  }

  setValue = (name: keyof State, val: string) => {
    this.setState({
      [name]: val
    } as any);
  };

  logIn = async (token: string) => {
    console.log(token);
    await AsyncStorage.setItem('token', token);
    this.props.navigation.navigate('Profile');
  };

  signin = async (signin: Function) => {
    const res = await signin();
    if (res) {
      await this.logIn(res.data.signin.jwt);
    }
  };

  render() {
    const { email, password, success } = this.state;
    return (
      <Mutation mutation={SIGNIN_MUTATION} variables={this.state}>
        {(signin, { error, loading }) => {
          return (
            <ImageBackground
              source={require('../../assets/bg1.jpg')}
              style={{ width: '100%', height: '100%' }}
            >
              <PaddingView>
                <RowColumn noGutters>
                  <ColColumn flex={4} justify="center" align="center">
                    <Logo />
                  </ColColumn>
                  {loading ? (
                    <ColColumn justify="center" align="center">
                      <Loader />
                    </ColColumn>
                  ) : (
                    <ColColumn flex={4}>
                      <RowColumn>
                        <ColColumn>
                          <Input
                            value={email}
                            onChangeText={(val: string) =>
                              this.setValue('email', val)
                            }
                            placeholder="Email"
                          />
                        </ColColumn>
                        <ColColumn>
                          <Input
                            value={password}
                            onChangeText={(val: string) =>
                              this.setValue('password', val)
                            }
                            placeholder="Password"
                            secureTextEntry={true}
                          />
                        </ColColumn>
                        <ColColumn>
                          <Row noGutters>
                            <Col>
                              <TextButton
                                onPress={() =>
                                  this.props.navigation.navigate('Register')
                                }
                              >
                                <Text color={colors.white} align="left">
                                  Create account
                                </Text>
                              </TextButton>
                            </Col>
                            <Col>
                              <TextButton
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    'ForgotPassword'
                                  )
                                }
                              >
                                <Text color={colors.white} align="left">
                                  Forgot password?
                                </Text>
                              </TextButton>
                            </Col>
                          </Row>
                        </ColColumn>
                        <ColColumn>
                          <Button
                            title="Login"
                            full
                            disabled={
                              !(
                                password.length > 0 &&
                                email.length > 0 &&
                                emailValidation(email)
                              )
                            }
                            onPress={() => this.signin(signin)}
                          >
                            <Text color={colors.white}>Login</Text>
                          </Button>
                        </ColColumn>
                        <ColColumn>
                          <FacebookLogin logIn={this.logIn} />
                        </ColColumn>
                        <ColColumn>
                          <QLNotifications error={error} success={success} />
                        </ColColumn>
                      </RowColumn>
                    </ColColumn>
                  )}
                </RowColumn>
              </PaddingView>
            </ImageBackground>
          );
        }}
      </Mutation>
    );
  }
}
