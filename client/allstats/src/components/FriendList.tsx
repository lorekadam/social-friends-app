import React, { Component } from 'react';
import { Text, View } from 'react-native';
import gql from 'graphql-tag';

// const MY_FRIENDS_QUERY = gql`
//   query MY_FRIENDS_QUERY {
//     name
//   }
// `;

export default class FriendList extends Component {
  render() {
    return (
      <View>
        <Text> Friend list component </Text>
      </View>
    );
  }
}
