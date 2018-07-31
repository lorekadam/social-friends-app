import React from 'react';
import { Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';

import Screen from '../styled/Screen';
import { StyledText } from '../styled/StyledComponents';
import { back } from '../actions/navigationActions';
import { GET_USER } from '../queries';

@connect()
export default class FriendsScreen extends React.Component {
  render() {
    return (
      <Query query={GET_USER}>
        {({ loading, error, data }) => (
          <React.Fragment>
            <Screen column>
              <Button onPress={() => this.props.dispatch(back())}>
                <StyledText>Back</StyledText>
              </Button>
              {loading ? <Spinner /> : <StyledText>email:{data.user.email}</StyledText>}
            </Screen>
          </React.Fragment>
        )}
      </Query>
    );
  }
}
