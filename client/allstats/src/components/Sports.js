import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Text } from 'react-native';

const ALL_SPORTS_QUERY = gql`
  query ALL_SPORTS_QUERY {
    sports {
      id
      name
    }
  }
`;

export default class Sports extends Component {
  render() {
    return (
      <Query query={ALL_SPORTS_QUERY}>
        {(payload) => {
          console.log(payload);
          return <Text>Sports</Text>;
        }}
      </Query>
    );
  }
}
