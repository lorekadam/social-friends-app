import React, { Component } from 'react';
import FriendListItem from './FriendListItem';
import { FullView } from '../../styled/View';
import { Text } from '../../styled/Text';

interface Friendship {
  accepted: boolean;
  friend: { id: string; name: string };
}

interface Props {
  friendships: [Friendship];
  refetch: any;
}

export default class FriendList extends Component<Props> {
  renderFriendListItems = (
    friendships: Props['friendships'],
    refetch: Props['refetch']
  ) => {
    const elements: [JSX.Element?] = [];
    friendships.map((friendship) => {
      const { id, name } = friendship.friend;
      elements.push(
        <FriendListItem
          key={`friend${id}`}
          name={name}
          accepted={friendship.accepted}
          id={id}
          refetch={refetch}
        />
      );
    });
    return elements;
  };
  render() {
    const { friendships, refetch } = this.props;
    return (
      <FullView>{this.renderFriendListItems(friendships, refetch)}</FullView>
    );
  }
}
