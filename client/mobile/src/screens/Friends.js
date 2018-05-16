import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'native-base';

import Screen from '../styled/Screen';
import { StyledText } from '../styled/StyledComponents';
import { back } from '../actions/navigationActions';

@connect()
export default class FriendsScreen extends React.Component {
  render() {
    return (
      <Screen column>
        <StyledText>Friends</StyledText>
        <Button onPress={() => this.props.dispatch(back())}>
          <StyledText>Back</StyledText>
        </Button>
      </Screen>
    );
  }
}
