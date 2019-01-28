import React from 'react';
import { Button, Spinner, Row, Text, Icon, Col } from 'native-base';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import { StyledText } from '../styled/StyledComponents';
import { back } from '../actions/navigationActions';
import { getUser } from '../ql/queries';

import FriendsList from '../components/FriendsList';
import AddFriend from '../mutations/AddFriend';
import NotificationsList from '../components/NotificationsList';

@connect(store => ({
  username: store.user.username
}))
export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      friendInput: false,
      notifications: false
    };
  }

  toggleFriendInput = () => {
    this.setState({
      friendInput: !this.state.friendInput
    });
  };

  toggleNotifications = () => {
    this.setState({
      notifications: !this.state.notifications
    });
  };

  render() {
    const { username, dispatch } = this.props;
    const { friendInput, notifications } = this.state;
    return (
      <ScrollView>
        <Query query={getUser()} pollInterval={500}>
          {({ loading, data }) => (
            <React.Fragment>
              <Row>
                <Col>
                  <Button onPress={() => dispatch(back())}>
                    <Text>Back</Text>
                  </Button>
                </Col>
                <Col>
                  <Button onPress={this.toggleFriendInput}>
                    <Text>Add friend</Text>
                  </Button>
                </Col>
                <Col>
                  <Button rounded onPress={this.toggleNotifications}>
                    <Icon type="Feather" name="bell" />
                    <Text>{loading === false && data.user.notifications.length}</Text>
                  </Button>
                </Col>
              </Row>
              {notifications && <NotificationsList notifications={data.user.notifications} />}
              {friendInput && <AddFriend />}
              {loading ? (
                <Spinner />
              ) : (
                <React.Fragment>
                  <StyledText co>
                    email:
                    {data.user.email}
                  </StyledText>
                  <FriendsList myName={username} friends={data.user.friends} />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </Query>
      </ScrollView>
    );
  }
}
