import React, { Component } from 'react';
import { Notification } from '../styled/Notification';
import { Text } from '../styled/Text';
import colors from '../styled/colors';
import { ApolloError } from 'apollo-boost';

interface Props {
  error?: ApolloError;
  success?: string;
}
export default class QLNotifications extends Component<Props, {}> {
  render() {
    const { error, success } = this.props;
    return (
      <React.Fragment>
        {error && (
          <Notification error>
            <Text color={colors.white}>
              {error.message.replace('GraphQL error: ', '')}
            </Text>
          </Notification>
        )}
        {success !== undefined && success.length > 0 && (
          <Notification success>
            <Text color={colors.white}>
              {success.replace('GraphQL error: ', '')}
            </Text>
          </Notification>
        )}
      </React.Fragment>
    );
  }
}
