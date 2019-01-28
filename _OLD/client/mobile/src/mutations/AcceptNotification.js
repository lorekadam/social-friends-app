import React from 'react';
import { Button, ListItem, Text } from 'native-base';
import { Mutation } from 'react-apollo';
import { acceptNotification } from '../ql/mutations';

export default class AcceptNotification extends React.Component {
  handleMutation = (action, _id) => {
    action({ variables: { _id } });
  };
  render() {
    const { _id, message } = this.props.notification;
    return (
      <Mutation mutation={acceptNotification()}>
        {(accept, { data, loading, error }) => (
          <ListItem>
            <Text>{message}</Text>
            <Button onPress={() => this.handleMutation(accept, _id)}>
              <Text>Accept</Text>
            </Button>
          </ListItem>
        )}
      </Mutation>
    );
  }
}
