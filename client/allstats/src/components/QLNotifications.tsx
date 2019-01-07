import React, { Component } from 'react';
import { Notification } from '../styled/Notification';
import { Text } from '../styled/Text';
import colors from '../styled/colors';
import { ApolloError } from 'apollo-boost';

interface Props {
  error?: ApolloError;
  success?: boolean;
  message: string;
}
export default class QLNotifications extends Component<Props, {}> {
  render() {
    const { error, success, message } = this.props;
    return (
      <React.Fragment>
        {error && (
          <Notification error>
            <Text color={colors.white}>
              {message.replace('GraphQL error: ', '')}
            </Text>
          </Notification>
        )}
        {success && (
          <Notification success>
            <Text color={colors.white}>Logged in!</Text>
          </Notification>
        )}
      </React.Fragment>
    );
  }
}
