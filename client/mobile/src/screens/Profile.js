import React from 'react';
import { Button, Spinner, Row, Text } from 'native-base';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import { ScrollScreen } from '../styled/Screen';
import { StyledText } from '../styled/StyledComponents';
import { back } from '../actions/navigationActions';
import { getUser } from '../ql/queries';

import FriendsList from '../components/FriendsList';
import AddFriend from '../mutations/AddFriend';

@connect()
export default class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      friendInput: false
    };
  }

  toggleFriendInput = () => {
    this.setState({
      friendInput: !this.state.friendInput
    });
  };

  render() {
    const { dispatch } = this.props;
    const { friendInput } = this.state;
    return (
      <Query query={getUser()}>
        {({ loading, error, data }) => (
          <React.Fragment>
            <ScrollScreen column>
              <Row>
                <Button onPress={() => dispatch(back())}>
                  <Text>Back</Text>
                </Button>
                <Button onPress={this.toggleFriendInput}>
                  <Text>Add friend</Text>
                </Button>
              </Row>
              {friendInput && <AddFriend />}
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
