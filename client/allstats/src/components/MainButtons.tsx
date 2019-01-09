import React, { Component } from 'react';
import { Row, Col } from '../styled/Grid';
import StartGameButton from './StartGameButton';
import FriendsButton from './FirendsButton';
import NotificationsButton from './NotificationsButton';

export default class MainButtons extends Component {
  render() {
    return (
      <Row>
        <Col justify="center">
          <StartGameButton />
        </Col>
        <Col justify="center">
          <FriendsButton />
        </Col>
        <Col justify="center">
          <NotificationsButton />
        </Col>
      </Row>
    );
  }
}
