import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'native-base';

import { Screen } from '../styled/Screen';
import { StyledText } from '../styled/StyledComponents';
import { back } from '../actions/navigationActions';

@connect()
export default class TournamentsScreen extends React.Component {
  render() {
    return (
      <Screen column>
        <StyledText>Tournaments</StyledText>
        <Button onPress={() => this.props.dispatch(back())}>
          <StyledText>Back</StyledText>
        </Button>
      </Screen>
    );
  }
}
