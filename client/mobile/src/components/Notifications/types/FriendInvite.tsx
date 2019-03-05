import React, { Component } from 'react';
import { Text } from 'react-native';
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
      <Mutation
        refetchQueries={[
          {
            query: MY_FRIENDS_QUERY,
            variables: { last: 5 }
          },
          {
            query: MY_NOTIFICATIONS_QUERY
          }
        ]}
        mutation={ACCEPT_FRIEND_INVITE_MUTATION}
        variables={{ id }}
      >
        {(acceptFriendInvite, { error, loading }) => {
          if (error) return <QLNotifications error={error} />;
          if (loading) return <Loader />;
          return (
            <NotificationItem viewed={viewed}>
              <Text>Friend invitation from {friend.name}</Text>

              <CircleIconButton
                bgColor={colors.dark1}
                size={24}
                iconSize={14}
                icon="plus"
                action={async () => {
                  await acceptFriendInvite();
                }}
              />
            </NotificationItem>
          );
        }}
      </Mutation>
    );
  }
}
