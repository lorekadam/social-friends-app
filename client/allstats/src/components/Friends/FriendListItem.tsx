import React, { Component } from 'react';
import { Text } from 'react-native';
import CircleIconButton from '../display/CircleIconButton';
import { Row, Col } from '../../styled/Grid';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loader from '../Loader';

interface Props {
  name: string;
  accepted: boolean;
  id: string;
  refetch: any;
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
    const { name, accepted, id, refetch } = this.props;
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
                      const res = await removeFriend();
                      if (res) {
                        refetch();
                      }
                    }}
                  />
                </Col>
              </React.Fragment>
            )}
          </Row>
        )}
      </Mutation>
    );
  }
}
