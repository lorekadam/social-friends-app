import React, { Component } from 'react';
import { PaddingView } from '../../styled/View';
import FriendInvitation from './FriendInvitation';
import FriendList from './FriendList';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loader from '../Loader';

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

export default class Friends extends Component {
  render() {
    return (
      <Query query={MY_FRIENDS_QUERY}>
        {({ loading, data, refetch }) => {
          return (
            <PaddingView padding={5}>
              <FriendInvitation refetch={refetch} />
              {loading ? (
                <Loader />
              ) : (
                <FriendList friendships={data.friendships} refetch={refetch} />
              )}
            </PaddingView>
          );
        }}
      </Query>
    );
  }
}
