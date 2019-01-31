import React, { Component } from 'react';
import CircleIconButton from '../display/CircleIconButton';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import colors from '../../styled/colors';

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
          <CircleIconButton
            iconSize={26}
            buttonColor={colors.seaMist}
            color={colors.prestigeGreen}
            action={() => toggleFriends()}
            icon="user"
          />
        )}
      </Mutation>
    );
  }
}
