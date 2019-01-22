import React, { Component } from 'react';
import { FullView } from '../../styled/View';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Text } from 'react-native';
import { NotificationTypes, ArrayTwoOrMore } from '../../types/globals';
import FriendInvite from './types/FriendInvite';

interface Notification {
  id: string;
  type: NotificationTypes;
  friendship?: ArrayTwoOrMore<{
    friend: {
      id: string;
      name: string;
    };
  }>;
}

const MY_NOTIFICATIONS_QUERY = gql`
  query MY_NOTIFICATIONS_QUERY {
    notifications {
      id
      type
      friendship {
        friend {
          id
          name
        }
      }
    }
  }
`;

export default class NotificationsList extends Component {
  renderNotificationListItems = (notifications: [Notification]) => {
    let elements: [JSX.Element?] = [];
    notifications.map((notification) => {
      const { id, type, friendship } = notification;
      if (
        type === NotificationTypes.FRIEND_INVITE &&
        friendship !== undefined
      ) {
        elements.push(
          <FriendInvite key={id} id={id} friend={friendship[1].friend} />
        );
      }
    });
    return elements;
  };
  render() {
    return (
      <Query query={MY_NOTIFICATIONS_QUERY}>
        {({ data }) => {
          return (
            <FullView>
              {data.notifications && data.notifications.length > 0 ? (
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
