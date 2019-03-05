import React, { Component } from 'react';
import { AlertMessage } from '../styled/AlertMessage';
import { Text } from '../styled/Text';
import colors from '../styled/colors';

interface Props {
  error?: any;
  success?: string;
}
export default class QLNotifications extends Component<Props, {}> {
  render() {
    const { error, success } = this.props;
    return (
      <React.Fragment>
        {error && (
          <AlertMessage error>
            <Text color={colors.white}>
              {error.message.replace('GraphQL error: ', '')}
            </Text>
          </AlertMessage>
        )}
        {success !== undefined && success.length > 0 && (
          <AlertMessage success>
            <Text color={colors.white}>
              {success.replace('GraphQL error: ', '')}
            </Text>
          </AlertMessage>
        )}
      </React.Fragment>
    );
  }
}
