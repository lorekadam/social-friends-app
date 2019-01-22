import React, { Component } from 'react';
import { Text } from 'react-native';
import { FullView } from '../../../styled/View';
import { Row, Col } from '../../../styled/Grid';
import PillTextIconButton from '../../display/PillTextIconButton';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import QLNotifications from '../../QLNotifications';
import Loader from '../../Loader';

interface Props {
  id: string;
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
  constructor(props: Props) {
    super(props);
    this.state = {
      success: ''
    };
  }
  render() {
    const { id } = this.props;
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
                      <Text>
                        Friend invitation from {this.props.friend.name}{' '}
                      </Text>
                    </Col>
                    <Col>
                      <PillTextIconButton
                        text="Accept"
                        icon="plus"
                        action={async () => {
                          const res = await acceptFriendInvite();
                          if (res) {
                            this.setState({
                              success: res.data.acceptFriendInvite.message
                            });
                          }
                        }}
                      />
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
