import React from 'react';
import { connect } from 'react-redux';
import { Button, Text, Row, Col } from 'native-base';
import * as types from '../actions/types';

import { Screen } from '../styled/Screen';
import { back, navChange } from '../actions/navigationActions';

@connect()
export default class DuelsScreen extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Screen column>
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
