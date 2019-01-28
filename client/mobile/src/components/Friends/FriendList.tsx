import React, { Component } from 'react';
import { Text } from 'react-native';
import gql from 'graphql-tag';
import { Query, RefetchQueriesProviderFn } from 'react-apollo';
import FriendListItem from './FriendListItem';
import { FullView } from '../../styled/View';
import Loader from '../Loader';

interface Friendship {
  accepted: boolean;
  friend: { id: string; name: string };
}

const MY_FRIENDS_QUERY = gql`
  query MY_FRIENDS_QUERY {
    friendships {
      accepted
      friend {
        id
        name
      }
    }
  }
`;

export default class FriendList extends Component {
  renderFriendListItems = (friendships: [Friendship], refetch) => {
    let elements: [JSX.Element?] = [];
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
    return (
      <Query query={MY_FRIENDS_QUERY}>
        {({ loading, data, refetch }) => {
          return (
            <FullView>
              {loading ? (
                <Loader />
              ) : data && data.friendships && data.friendships.length > 0 ? (
                <React.Fragment>
                  <Text>Your Friends - {data.friendships.length}</Text>
                  {this.renderFriendListItems(data.friendships, refetch)}
                </React.Fragment>
              ) : (
                <Text>You haven't got any friends</Text>
              )}
            </FullView>
          );
        }}
      </Query>
    );
  }
}
