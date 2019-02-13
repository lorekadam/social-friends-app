import React, { Component } from 'react';
import { Text } from 'react-native';
import CircleIconButton from '../display/CircleIconButton';
import { Row, Col } from '../../styled/Grid';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from '../Loader';
import { MY_FRIENDS_QUERY } from './Friends';
import QLNotifications from '../QLNotifications';

interface Props {
  name: string;
  accepted: boolean;
  id: string;
}

const REMOVE_FRIEND_MUTATION = gql`
  mutation REMOVE_FRIEND_MUTATION($friendId: String!) {
    removeFriend(friendId: $friendId) {
      message
    }
  }
`;

export default class FriendListItem extends Component<Props, {}> {
  render() {
    const { name, accepted, id } = this.props;
    return (
      <Mutation mutation={REMOVE_FRIEND_MUTATION} variables={{ friendId: id }}>
        {(removeFriend, { error, loading }) => (
          <Row>
            {loading ? (
              <Loader />
            ) : (
              <React.Fragment>
                <Col flex={3}>
                  <Text>
                    {name} / {accepted.toString()}
                  </Text>
                </Col>
                <Col flex={1}>
                  <CircleIconButton
                    icon="minus"
                    action={async () => {
                      await removeFriend({
                        refetchQueries: [
                          {
                            query: MY_FRIENDS_QUERY
                          }
                        ]
                      });
                    }}
                  />
                </Col>
                {error && <QLNotifications error={error} />}
              </React.Fragment>
            )}
          </Row>
        )}
      </Mutation>
    );
  }
}
