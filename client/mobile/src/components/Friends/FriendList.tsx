import React, { Component } from 'react';
import FriendListItem from './FriendListItem';
import { FullView } from '../../styled/View';

interface Friendship {
  accepted: boolean;
  friend: { id: string; name: string };
}

interface Props {
  friendships: [Friendship];
}

export default class FriendList extends Component<Props> {
  renderFriendListItems = (friendships: Props['friendships']) => {
    const elements: [JSX.Element?] = [];
    friendships.map((friendship) => {
      const { id, name } = friendship.friend;
      elements.push(
        <FriendListItem
          key={`friend${id}`}
          name={name}
          accepted={friendship.accepted}
          id={id}
        />
      );
    });
    return elements;
  };
  render() {
    const { friendships } = this.props;
    return <FullView>{this.renderFriendListItems(friendships)}</FullView>;
  }
}
