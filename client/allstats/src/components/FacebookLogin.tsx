import React, { Component } from 'react';
import { Facebook } from 'expo';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { facebookAppId } from '../config';
import { Button } from '../styled/Buttons';
import colors from '../styled/colors';
import { Text } from '../styled/Text';

interface Props {
  logIn: Function;
}

export default class FacebookLogin extends Component<Props> {
  logInWithFacebook = async () => {
    try {
      const {
        type,
        token
        // expires,
        // permissions,
        // declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync(facebookAppId, {
        permissions: ['public_profile'],
        behavior: 'native'
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        // const response = await fetch(
        //   `https://graph.facebook.com/me?access_token=${token}`
        // );
        await AsyncStorage.setItem('token', token ? token : '');
        await this.props.logIn(token);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      console.log(message);
    }
  };
  render() {
    return (
      <Button bg={colors.facebook} onPress={this.logInWithFacebook}>
        <Ionicons
          name="logo-facebook"
          size={22}
          color="white"
          style={{ marginRight: 5 }}
        />
        <Text color={colors.white}>Login with Facebook</Text>
      </Button>
    );
  }
}
