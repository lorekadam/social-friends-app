import React from 'react';
import { Button, Spinner, Row, Form, Input, Item } from 'native-base';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import { ScrollScreen } from '../styled/Screen';
import { StyledText } from '../styled/StyledComponents';
import { back } from '../actions/navigationActions';
import { getUser } from '../queries';
import FriendsList from '../components/FriendsList';

@connect(store => ({
  user: store.user
}))
export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingFriends: false,
      friendInput: false,
      friendInputValue: ''
    };
  }

  setFriend = (val) => {
    this.setState({
      friendInputValue: val
    });
  };

  toggleFriendInput = () => {
    this.setState({
      friendInput: !this.state.friendInput
    });
  };

  render() {
    const { user, dispatch } = this.props;
    const { loadingFriends, friendInput, friendInputValue } = this.state;
    return (
      <Query query={getUser(user._id)}>
        {({ loading, error, data }) => (
          <React.Fragment>
            <ScrollScreen column>
              <Row>
                <Button onPress={() => dispatch(back())}>
                  <StyledText>Back</StyledText>
                </Button>
                <Button onPress={this.toggleFriendInput}>
                  <StyledText>Add friend</StyledText>
                </Button>
              </Row>
              {friendInput && (
                <Form>
                  <Row>
                    <Item rounded>
                      <Input
                        value={friendInputValue}
                        onChangeText={val => this.setFriend(val)}
                        placeholder="Friend username..."
                      />
                    </Item>
                    <Button>
                      <StyledText>Send invite</StyledText>
                    </Button>
                  </Row>
                </Form>
              )}
              {loading ? (
                <Spinner />
              ) : (
                <React.Fragment>
                  <StyledText>
                    email:
                    {data.user.email}
                  </StyledText>
                  <FriendsList friends={data.user.friends} />
                </React.Fragment>
              )}
            </ScrollScreen>
          </React.Fragment>
        )}
      </Query>
    );
  }
}
