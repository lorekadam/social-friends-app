import React, { Component } from 'react';
import { Text, View } from 'react-native';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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
  renderFriends = (friendships) => {
    let friends = [];
    friendships.map((friendship) => {
      friends.push(
        <Text>
          ${friendship.friend.name} / ${friendship.accepted}
        </Text>
      );
    });
    return friends;
  };
  render() {
    return (
      <Query query={MY_FRIENDS_QUERY}>
        {({ data }) => {
          return (
            <View>
              <Text> Friend list component </Text>
              {data && this.renderFriends(data.friendships)}
            </View>
          );
        }}
      </Query>
    );
  }
}
