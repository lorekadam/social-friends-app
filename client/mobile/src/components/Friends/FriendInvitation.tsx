import React, { Component } from 'react';
import { Text } from 'react-native';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { Input } from '../../styled/Input';
import colors from '../../styled/colors';
import { FullView } from '../../styled/View';
import { Button } from '../../styled/Buttons';
import { Row, Col } from '../../styled/Grid';
import { nameValidation } from '../../utils/validations';
import QLNotifications from '../QLNotifications';
import Loader from '../Loader';
import { QRCODESCANNER_PAGE } from '../../navigation/pageTypes';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  refetch: any;
}
interface State {
  name: string;
  success: string;
}

export const INVITE_FRIEND_MUTATION = gql`
  mutation INVITE_FRIEND_MUTATION($name: String, $id: String) {
    inviteFriend(name: $name, id: $id) {
      message
    }
  }
`;

class FriendInvitation extends Component<Props, State> {
  constructor(props: Props) {
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
                    <Col>
                      <Input
                        onChangeText={(val: string) => this.handleChange(val)}
                        value={name}
                        placeholder="Name..."
                        color={colors.defaultText}
                        borderColor={colors.pink}
                      />
                    </Col>
                    <Col>
                      <Button
                        disabled={!nameValidation(name)}
                        onPress={async () => {
                          const res = await inviteFriend();
                          if (res) {
                            this.setState({
                              success: res.data.inviteFriend.message
                            });
                          }
                          this.props.refetch();
                        }}
                      >
                        <Text>Send!</Text>
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        onPress={() =>
                          this.props.navigation.navigate(QRCODESCANNER_PAGE)
                        }
                      >
                        <Text>Scan QR</Text>
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

export default withNavigation(FriendInvitation);
