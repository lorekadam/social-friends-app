import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Query } from 'react-apollo';
import { ScrollView, NativeScrollEvent } from 'react-native';
import PageSpine from './PageSpine';
import { MY_FRIENDS_CONNECTION_QUERY } from '../QL/Queries';
import QLNotifications from '../components/QLNotifications';
import Loader from '../components/Loader';
import FriendList, { Friendship } from '../components/Friends/FriendList';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class FriendsPage extends Component<Props, {}> {
  state = {
    friendships: [],
  };

  render() {
    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize,
    }: NativeScrollEvent) => {
      const bottomOffset = 10;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - bottomOffset
      );
    };
    return (
      <Query query={MY_FRIENDS_CONNECTION_QUERY} variables={{ first: 10 }}>
        {({ data, loading, error, fetchMore }) => {
          if (error) return <QLNotifications error={error} />;
          if (loading) return <Loader />;
          return (
            <PageSpine>
              <ScrollView
                onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    if (data.friendshipsConnection.pageInfo.hasNextPage) {
                      fetchMore({
                        query: MY_FRIENDS_CONNECTION_QUERY,
                        variables: {
                          after: data.friendshipsConnection.pageInfo.endCursor,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => ({
                          friendshipsConnection: {
                            __typename: 'FriendshipsConnection',
                            pageInfo:
                              fetchMoreResult.friendshipsConnection.pageInfo,
                            edges: [
                              ...prev.friendshipsConnection.edges,
                              ...fetchMoreResult.friendshipsConnection.edges,
                            ],
                          },
                        }),
                      });
                    }
                  }
                }}
                style={{ maxHeight: '100%', width: '100%' }}
              >
                <FriendList
                  friendships={data.friendshipsConnection.edges.map(
                    (friendship: { node: Friendship }) => friendship.node
                  )}
                />
              </ScrollView>
            </PageSpine>
          );
        }}
      </Query>
    );
  }
}
