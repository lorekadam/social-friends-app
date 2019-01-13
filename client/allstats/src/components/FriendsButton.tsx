import React, { Component } from 'react';
import CircleIconButton from './display/CircleIconButton';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const TOGGLE_FRIENDS_MUTATION = gql`
  mutation {
    toggleFriends @client
  }
`;

export default class FriendsButton extends Component {
  render() {
    return (
      <Mutation mutation={TOGGLE_FRIENDS_MUTATION}>
        {(toggleFriends) => (
          <CircleIconButton action={() => toggleFriends()} icon="user" />
        )}
      </Mutation>
    );
  }
}
