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
            <FullView>
              <Row>
                <Col>
                  <Text>Friend invitation from {friend.name}</Text>
                </Col>

                <Col>
                  <PillTextIconButton
                    text="Accept"
                    icon="plus"
                    action={async () => {
                      await acceptFriendInvite();
                    }}
                  />
                </Col>
                <Col>
                  <Text>{viewed.toString()}</Text>
                </Col>
              </Row>
            </FullView>
          );
        }}
      </Mutation>
    );
  }
}
