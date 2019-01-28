import React, { Component } from 'react';
import CircleIconButton from '../display/CircleIconButton';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const TOGGLE_NOTIFICATIONS_MUTATION = gql`
  mutation {
    toggleNotifications @client
  }
`;

export default class NotificationsButton extends Component {
  render() {
    return (
      <Mutation mutation={TOGGLE_NOTIFICATIONS_MUTATION}>
        {(toggleNotification) => (
          <CircleIconButton icon="mail" action={() => toggleNotification()} />
        )}
      </Mutation>
    );
  }
}
