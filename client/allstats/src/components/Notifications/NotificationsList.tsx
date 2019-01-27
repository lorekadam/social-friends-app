import React, { Component } from 'react';
import { FullView } from '../../styled/View';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Text } from 'react-native';
import { NotificationTypes, ArrayTwoOrMore } from '../../types/globals';
import FriendInvite from './types/FriendInvite';
import Loader from '../Loader';

interface Notification {
  id: string;
  type: NotificationTypes;
  user: {
    id: string;
  };
  friendship?: ArrayTwoOrMore<{
    friend: {
      id: string;
      name: string;
    };
  }>;
  accepted: boolean;
  viewed: boolean;
}

const MY_NOTIFICATIONS_QUERY = gql`
  query MY_NOTIFICATIONS_QUERY {
    notifications {
      id
      user {
        id
      }
      type
      friendship {
        friend {
          id
          name
        }
      }
      accepted
      viewed
    }
  }
`;

export default class NotificationsList extends Component {
  renderNotificationListItems = (notifications: [Notification]) => {
    let elements: [JSX.Element?] = [];
    notifications.map((notification) => {
      const { id, type, friendship, accepted, viewed, user } = notification;
      if (
        type === NotificationTypes.FRIEND_INVITE &&
        friendship !== undefined &&
        friendship.length === 2
      ) {
        elements.push(
          <FriendInvite
            key={id}
            id={id}
            viewed={viewed}
            accepted={accepted}
            friend={
              friendship[0].friend.id === user.id
                ? friendship[1].friend
                : friendship[0].friend
            }
          />
        );
      }
    });
    return elements;
  };
  render() {
    return (
      <Query query={MY_NOTIFICATIONS_QUERY} pollInterval={500}>
        {({ loading, data }) => {
          return (
            <FullView>
              {loading ? (
                <Loader />
              ) : data &&
                data.notifications &&
                data.notifications.length > 0 ? (
                <React.Fragment>
                  <Text>
                    You have {data.notifications.length} notifications
                  </Text>
                  {this.renderNotificationListItems(data.notifications)}
                </React.Fragment>
              ) : (
                <Text>You haven't got any notifications</Text>
              )}
            </FullView>
          );
        }}
      </Query>
    );
  }
}
