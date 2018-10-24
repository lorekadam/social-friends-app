import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, Row, Col } from 'native-base';

import { Screen } from '../styled/Screen';
import { StyledText } from '../styled/StyledComponents';
import { back, navChange } from '../actions/navigationActions';

import * as types from '../actions/types';

@connect()
export default class DuelDetailsScreen extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Screen column>
        <StyledText>Duel Details</StyledText>
        <Row>
          <Col>
            <Button onPress={() => dispatch(back())}>
              <Text>Back</Text>
            </Button>
          </Col>
          <Col>
            <Button onPress={() => dispatch(navChange(types.ADD_GAME_SCREEN))}>
              <Text>Add new game</Text>
            </Button>
          </Col>
        </Row>
      </Screen>
    );
  }
}
