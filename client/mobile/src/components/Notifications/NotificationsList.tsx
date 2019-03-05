import React, { Component } from 'react';
import { FullView } from '../../styled/View';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NotificationTypes, ArrayTwoOrMore } from '../../QL/globals';
import FriendInvite from './types/FriendInvite';
import Loader from '../Loader';
import { Text } from '../../styled/Text';
import { FindUser } from '../../QL/types';

interface Notification {
  id: string;
  type: NotificationTypes;
  user: {
    id: string;
  };
  friendship?: ArrayTwoOrMore<{
    friend: FindUser;
  }>;
  viewed: boolean;
}

export const MY_NOTIFICATIONS_QUERY = gql`
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
      viewed
    }
  }
`;

export default class NotificationsList extends Component {
  renderNotificationListItems = (notifications: [Notification]) => {
    const elements: [JSX.Element?] = [];
    notifications.map((notification) => {
      const { id, type, friendship, viewed, user } = notification;
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
              ) : data.notifications.length > 0 ? (
                <React.Fragment>
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
