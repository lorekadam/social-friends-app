import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Text } from '../styled/Text';
import PageSpine from './PageSpine';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
    }
  }
`;

export default class ProfilePage extends Component<Props, {}> {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ data }) => {
          return (
            <PageSpine
              navigation={this.props.navigation}
              name={data.me ? data.me.name : ''}
            >
              <Text>Content</Text>
            </PageSpine>
          );
        }}
      </Query>
    );
  }
}
