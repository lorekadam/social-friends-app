import React, { Component } from 'react';
import { Facebook } from 'expo';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { facebookAppId } from '../config';
import { Button } from '../styled/Buttons';
import colors from '../styled/colors';
import { Text } from '../styled/Text';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

interface Props {
  logIn: Function;
}

const SIGNIN_FACEBOOK_MUTATION = gql`
  mutation SIGNIN_FACEBOOK_MUTATION($email: String!, $facebookId: String!) {
    signinFacebook(email: $email, facebookId: $facebookId) {
      id
      email
      name
      jwt
    }
  }
`;

export const logInWithFacebook = async (client: any, logIn: Props['logIn']) => {
  try {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      facebookAppId,
      {
        behavior: 'native'
      }
    );
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const res = await fetch(
        `https://graph.facebook.com/me?fields=email&access_token=${token}`
      );
      if (res) {
        const { email, id } = JSON.parse(res._bodyText);
        if (email) {
          const QLres = await client.mutate({
            mutation: SIGNIN_FACEBOOK_MUTATION,
            variables: {
              email,
              facebookId: id
            }
          });

          await logIn(QLres.data.signinFacebook.jwt);
        } else {
          alert(`To log in You must provide email`);
        }
      }
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
    console.log(message);
  }
};

export default class FacebookLogin extends Component<Props> {
  render() {
    return (
      <ApolloConsumer>
        {(client) => (
          <Button
            full
            bgColor={colors.facebook}
            onPress={() => logInWithFacebook(client, this.props.logIn)}
          >
            <Text color={colors.white}>Login with Facebook</Text>
            <Ionicons
              name="logo-facebook"
              size={22}
              color="white"
              style={{ marginLeft: 5 }}
            />
          </Button>
        )}
      </ApolloConsumer>
    );
  }
}
