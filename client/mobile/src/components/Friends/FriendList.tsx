import React, { Component } from 'react';
import FriendListItem from './FriendListItem';
import { FullView } from '../../styled/View';
import { FindUser } from '../../QL/types';
import { Query } from 'react-apollo';
import { ME_QUERY } from '../../pages/PageSpine';
import QLNotifications from '../QLNotifications';
import Loader from '../Loader';

export interface Friendship {
  accepted: boolean;
  friend: FindUser;
  inviting: {
    id: string;
  };
}

interface Props {
  friendships: Friendship[];
}

export default class FriendList extends Component<Props> {
  renderFriendListItems = (friendships: Props['friendships'], me: string) => {
    const elements: [JSX.Element?] = [];
    friendships.map((friendship) => {
      const { id, name } = friendship.friend;
      elements.push(
        <FriendListItem
          key={`friend${id}`}
          name={name}
          accepted={friendship.accepted}
          inviting={friendship.inviting.id}
          id={id}
          me={me}
        />
      );
    });
    return elements;
  };
  render() {
    const { friendships } = this.props;
    return (
      <Query query={ME_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <QLNotifications error={error} />;
          if (loading) return <Loader />;
          return (
            <FullView>
              {this.renderFriendListItems(friendships, data.me.id)}
            </FullView>
          );
        }}
      </Query>
    );
  }
}
