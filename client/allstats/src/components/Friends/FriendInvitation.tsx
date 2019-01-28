import React, { Component } from 'react';
import { Text } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Input } from '../../styled/Input';
import colors from '../../styled/colors';
import { FullView } from '../../styled/View';
import { Button } from '../../styled/Buttons';
import { Row, Col } from '../../styled/Grid';
import { nameValidation } from '../../utils/validations';
import QLNotifications from '../QLNotifications';
import Loader from '../Loader';

interface State {
  name: string;
  success: string;
}

const INVITE_FRIEND_MUTATION = gql`
  mutation INVITE_FRIEND_MUTATION($name: String!) {
    inviteFriend(name: $name) {
      message
    }
  }
`;

export default class FriendInvitation extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      name: '',
      success: ''
    };
  }

  handleChange = (name: string) => {
    this.setState({
      name
    });
  };

  render() {
    const { name, success } = this.state;
    return (
      <Mutation mutation={INVITE_FRIEND_MUTATION} variables={this.state}>
        {(inviteFriend, { error, loading }) => {
          return (
            <FullView>
              <Text>Send Friend invitation</Text>
              {loading ? (
                <Loader />
              ) : (
                <React.Fragment>
                  <Row>
                    <Col flex={2}>
                      <Input
                        onChangeText={(val: string) => this.handleChange(val)}
                        value={name}
                        placeholder="Name..."
                        color={colors.defaultText}
                        borderColor={colors.pink}
                      />
                    </Col>
                    <Col flex={1}>
                      <Button
                        disabled={!nameValidation(name)}
                        onPress={async () => {
                          const res = await inviteFriend();
                          if (res) {
                            this.setState({
                              success: res.data.inviteFriend.message
                            });
                          }
                        }}
                      >
                        <Text>Send!</Text>
                      </Button>
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
