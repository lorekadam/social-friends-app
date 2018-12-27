import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ImageBackground, Image } from 'react-native';
import { emailValidation } from '../helpers/validations';
import BackButton from '../components/BackButton';
import { View } from '../styled/View';
import { Input } from '../styled/Input';
import { Button } from '../styled/Buttons';
import { Text } from '../styled/Text';
import colors from '../styled/colors';
import { Notification } from '../styled/Notification';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      success: false
    };
  }

  setValue = (name, val) => {
    this.setState({
      [name]: val
    });
  };

  requestReset = async (requestReset) => {
    this.setState({
      success: false
    });
    const res = await requestReset();
    if (res) {
      this.setState({
        email: '',
        success: true
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
              <View>
                <BackButton
                  navigation={() => this.props.navigation.navigate('Login')}
                />
                <Image
                  source={require('../../assets/logo1.png')}
                  style={{ width: 280, height: 280, marginBottom: 13 }}
                />
                <Input
                  value={email}
                  onChangeText={(val) => this.setValue('email', val)}
                  placeholder="E-mail"
                />
                <Button
                  title="Send"
                  disabled={!(email.length > 0 && emailValidation(email))}
                  onPress={() => this.requestReset(requestReset)}
                >
                  <Text color={colors.white}>Send</Text>
                </Button>
                {error && (
                  <Notification error>
                    <Text color={colors.white}>
                      {error.message.replace('GraphQL error: ', '')}
                    </Text>
                  </Notification>
                )}
                {success && (
                  <Notification success>
                    <Text color={colors.white}>Check your mailbox</Text>
                  </Notification>
                )}
              </View>
            </ImageBackground>
          );
        }}
      </Mutation>
    );
  }
}
