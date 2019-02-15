import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import PageSpine from './PageSpine';
import { Query } from 'react-apollo';
import { MY_FRIENDS_QUERY, MY_FRIENDS_CONNECTION_QUERY } from '../QL/Queries';
import QLNotifications from '../components/QLNotifications';
import Loader from '../components/Loader';
import FriendList from '../components/Friends/FriendList';
import { Text } from '../styled/Text';
import { ScrollView, NativeScrollEvent } from 'react-native';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class FriendsPage extends Component<Props, {}> {
  render() {
    const isCloseToBottom = ({
      layoutMeasurement,
      contentOffset,
      contentSize
    }: NativeScrollEvent) => {
      const bottomOffset = 20;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - bottomOffset
      );
    };
    return (
      <Query query={MY_FRIENDS_QUERY}>
        {({ data, loading, error }) => {
          if (error) return <QLNotifications error={error} />;
          if (loading) return <Loader />;
          return (
            <PageSpine>
              <ScrollView
                onScroll={({ nativeEvent }) => {
                  if (isCloseToBottom(nativeEvent)) {
                    console.log('end');
                  }
                }}
                style={{ maxHeight: 50, width: '100%' }}
              >
                <FriendList friendships={data.friendships} />
              </ScrollView>
            </PageSpine>
          );
        }}
      </Query>
    );
  }
}
