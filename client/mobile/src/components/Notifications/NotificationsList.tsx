import React, { Component } from 'react';
import { FullView } from '../../styled/View';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NotificationTypes, ArrayTwoOrMore } from '../../types/globals';
import FriendInvite from './types/FriendInvite';
import Loader from '../Loader';
import { Text } from '../../styled/Text';

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
    return notifications.map((notification) => {
      const { id, type, friendship, accepted, viewed, user } = notification;
      if (
        type === NotificationTypes.FRIEND_INVITE &&
        friendship !== undefined &&
        friendship.length === 2 &&
        !accepted
      ) {
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
        />;
      }
    });
  };
  render() {
    return (
      <Query query={MY_NOTIFICATIONS_QUERY} pollInterval={500}>
        {({ loading, data }) => {
          return (
            <FullView>
              {loading ? (
                <Loader />
              ) : data.notifications.length > 0 ? (
                <React.Fragment>
                  <Text>
                    You have {data.notifications.length} notifications
                  </Text>
                  {this.renderNotificationListItems(data.notifications)}
                </React.Fragment>
              ) : (
                <Text>You haven't got any new notifications</Text>
              )}
            </FullView>
          );
        }}
      </Query>
    );
  }
}
