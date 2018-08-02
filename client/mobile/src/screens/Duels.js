import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'native-base';
import * as types from '../actions/types';

import { Screen } from '../styled/Screen';
import { StyledText } from '../styled/StyledComponents';
import { back, navChange } from '../actions/navigationActions';

@connect()
export default class DuelsScreen extends React.Component {
  render() {
    return (
      <Screen column>
        <StyledText>Duels</StyledText>
        <Button onPress={() => this.props.dispatch(back())}>
          <StyledText>Back</StyledText>
        </Button>
        <Button onPress={() => this.props.dispatch(navChange(types.ADD_GAME_SCREEN))}>
          <StyledText>Add new game</StyledText>
        </Button>
      </Screen>
    );
  }
}
