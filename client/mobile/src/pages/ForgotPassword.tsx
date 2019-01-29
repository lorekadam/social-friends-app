import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ImageBackground } from 'react-native';

import { emailValidation } from '../utils/validations';
import BackButton from '../components/BackButton';
import { PaddingView } from '../styled/View';
import { Input } from '../styled/Input';
import { Button } from '../styled/Buttons';
import { Text } from '../styled/Text';
import colors from '../styled/colors';
import QLNotifications from '../components/QLNotifications';
import Loader from '../components/Loader';
import Logo from '../components/Logo';
import { LOGIN_PAGE } from '../navigation/pageTypes';
import { RowColumn, ColColumn } from '../styled/Grid';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  email: string;
  success: string;
}

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export default class ForgotPassword extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: '',
      success: ''
    };
  }

  setValue = (name: string, val: string) => {
    this.setState({
      [name]: val
    } as any);
  };

  requestReset = async (requestReset: Function) => {
    this.setState({
      success: ''
    });
    const res = await requestReset();
    if (res) {
      console.log(res);
      this.setState({
        email: '',
        success: res.data.requestReset.message
      });
    }
  };

  render() {
    const { email, success } = this.state;
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(requestReset, { error, loading }) => {
          return (
            <ImageBackground
              source={require('../../assets/bg1.jpg')}
              style={{ width: '100%', height: '100%' }}
            >
              <PaddingView statusBar>
                <React.Fragment>
                  <BackButton path={LOGIN_PAGE} />
                  <RowColumn noGutters>
                    <ColColumn flex={4} justify="center" align="center">
                      <Logo />
                    </ColColumn>
                    {loading ? (
                      <ColColumn justify="center" align="center">
                        <Loader />
                      </ColColumn>
                    ) : (
                      <ColColumn flex={5}>
                        <RowColumn>
                          <ColColumn>
                            <Input
                              value={email}
                              onChangeText={(val: string) =>
                                this.setValue('email', val)
                              }
                              placeholder="E-mail"
                            />
                          </ColColumn>
                          <ColColumn>
                            <Button
                              full
                              disabled={
                                !(email.length > 0 && emailValidation(email))
                              }
                              onPress={() => this.requestReset(requestReset)}
                            >
                              <Text color={colors.white}>Send</Text>
                            </Button>
                          </ColColumn>
                          <ColColumn>
                            <QLNotifications error={error} success={success} />
                          </ColColumn>
                        </RowColumn>
                      </ColColumn>
                    )}
                  </RowColumn>
                </React.Fragment>
              </PaddingView>
            </ImageBackground>
          );
        }}
      </Mutation>
    );
  }
}
