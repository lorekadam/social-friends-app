import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'native-base';

import { Screen } from '../styled/Screen';
import { StyledText } from '../styled/StyledComponents';
import { back } from '../actions/navigationActions';

@connect()
export default class NameScreen extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Screen column>
        <StyledText>Screen</StyledText>
        <Button onPress={() => dispatch(back())}>
          <StyledText>Back</StyledText>
        </Button>
      </Screen>
    );
  }
}
