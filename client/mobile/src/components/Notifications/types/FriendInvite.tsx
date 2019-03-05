import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { FullView } from '../../../styled/View';
import { Row, Col } from '../../../styled/Grid';
import PillTextIconButton from '../../display/PillTextIconButton';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import QLNotifications from '../../QLNotifications';
import Loader from '../../Loader';
import { MY_NOTIFICATIONS_QUERY } from '../NotificationsList';
import { FindUser } from '../../../QL/types';
import { MY_FRIENDS_QUERY } from '../../../QL/Queries';
import CircleIconButton from '../../display/CircleIconButton';
import colors from '../../../styled/colors';
import { NotificationItem } from '../../../styled/Notifications';
import { REMOVE_FRIEND_MUTATION } from '../../Friends/FriendListItem';
import { MY_UNREAD_NOTIFICATIONS } from '../../../pages/PageSpine';

interface Props {
  id: string;
  viewed: boolean;
  friend: FindUser;
}

const ACCEPT_FRIEND_INVITE_MUTATION = gql`
  mutation ACCEPT_FRIEND_INVITE_MUTATION($id: String!) {
    acceptFriendInvite(id: $id) {
      message
    }
  }
`;

export default class FriendInvite extends Component<Props> {
  render() {
    const { id, friend, viewed } = this.props;
    return (
      <NotificationItem viewed={viewed}>
        <Col flex={3}>
          <Text>Friend invite from {friend.name}</Text>
        </Col>
        <Col>
          <Mutation
            refetchQueries={[
              {
                query: MY_FRIENDS_QUERY,
                variables: { last: 5 }
              },
              {
                query: MY_NOTIFICATIONS_QUERY
              },
              {
                query: MY_UNREAD_NOTIFICATIONS
              }
            ]}
            mutation={ACCEPT_FRIEND_INVITE_MUTATION}
            variables={{ id }}
          >
            {(acceptFriendInvite, { error, loading }) => {
              if (error) return <QLNotifications error={error} />;
              if (loading) return <Loader />;
              return (
                <CircleIconButton
                  bgColor={colors.dark1}
                  size={24}
                  iconSize={14}
                  icon="plus"
                  action={async () => {
                    await acceptFriendInvite();
                  }}
                />
              );
            }}
          </Mutation>
          <Mutation
            refetchQueries={[
              {
                query: MY_FRIENDS_QUERY,
                variables: { last: 5 }
              },
              {
                query: MY_NOTIFICATIONS_QUERY
              },
              {
                query: MY_UNREAD_NOTIFICATIONS
              }
            ]}
            mutation={REMOVE_FRIEND_MUTATION}
            variables={{ friendId: friend.id }}
          >
            {(acceptFriendInvite, { error, loading }) => {
              if (error) return <QLNotifications error={error} />;
              if (loading) return <Loader />;
              return (
                <CircleIconButton
                  bgColor={colors.error}
                  size={24}
                  iconSize={14}
                  icon="minus"
                  action={async () => {
                    await acceptFriendInvite();
                  }}
                />
              );
            }}
          </Mutation>
        </Col>
      </NotificationItem>
    );
  }
}
