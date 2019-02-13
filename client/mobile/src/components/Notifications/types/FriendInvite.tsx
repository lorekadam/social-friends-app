import React, { Component } from 'react';
import { Text } from 'react-native';
import { FullView } from '../../../styled/View';
import { Row, Col } from '../../../styled/Grid';
import PillTextIconButton from '../../display/PillTextIconButton';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import QLNotifications from '../../QLNotifications';
import Loader from '../../Loader';
import { MY_FRIENDS_QUERY } from '../../Friends/Friends';

interface Props {
  id: string;
  viewed: boolean;
  accepted: boolean;
  friend: {
    id: string;
    name: string;
  };
}

interface State {
  success: string;
}

const ACCEPT_FRIEND_INVITE_MUTATION = gql`
  mutation ACCEPT_FRIEND_INVITE_MUTATION($id: String!) {
    acceptFriendInvite(id: $id) {
      message
    }
  }
`;

export default class FriendInvite extends Component<Props, State> {
  state = {
    success: ''
  };

  render() {
    const { id, friend, accepted, viewed } = this.props;
    const { success } = this.state;
    return (
      <Mutation mutation={ACCEPT_FRIEND_INVITE_MUTATION} variables={{ id }}>
        {(acceptFriendInvite, { error, loading }) => {
          return (
            <FullView>
              {loading ? (
                <Loader />
              ) : (
                <React.Fragment>
                  <Row>
                    <Col>
                      <Text>Friend invitation from {friend.name}</Text>
                    </Col>
                    {!accepted && (
                      <Col>
                        <PillTextIconButton
                          text="Accept"
                          icon="plus"
                          action={async () => {
                            const res = await acceptFriendInvite({
                              refetchQueries: [
                                {
                                  query: MY_FRIENDS_QUERY
                                }
                              ]
                            });
                            if (res) {
                              this.setState({
                                success: res.data.acceptFriendInvite.message
                              });
                            }
                          }}
                        />
                      </Col>
                    )}
                    <Col>
                      <Text>{viewed.toString()}</Text>
                    </Col>
                  </Row>
                  <QLNotifications error={error} success={success} />
                </React.Fragment>
              )}
            </FullView>
          );
        }}
      </Mutation>
    );
  }
}
