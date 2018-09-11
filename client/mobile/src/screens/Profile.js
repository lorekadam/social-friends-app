import React from 'react';
import { Button, Spinner, Row, Text, Icon, Col, View, ListItem, List } from 'native-base';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import { ScrollScreen } from '../styled/Screen';
import { StyledText } from '../styled/StyledComponents';
import { back } from '../actions/navigationActions';
import { getUser } from '../ql/queries';

import FriendsList from '../components/FriendsList';
import AddFriend from '../mutations/AddFriend';
import NotificationsList from '../components/NotificationsList';

@connect()
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
    const { dispatch } = this.props;
    const { friendInput, notifications } = this.state;
    return (
      <Query query={getUser()} pollInterval={500}>
        {({ loading, data }) => (
          <ScrollScreen column>
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
                <FriendsList friends={data.user.friends} />
              </React.Fragment>
            )}
          </ScrollScreen>
        )}
      </Query>
    );
  }
}
