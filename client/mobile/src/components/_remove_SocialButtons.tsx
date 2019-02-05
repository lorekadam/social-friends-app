import React, { Component } from 'react';
import { Row, Col } from '../styled/Grid';
import FriendsButton from './ControlButtons/_remove_FriendsButton';
import NotificationsButton from './ControlButtons/_remove_NotificationsButton';
import SettingsButton from './ControlButtons/_remove_SettingsButton';

export default class SocialButtons extends Component {
  render() {
    return (
      <React.Fragment>
        <Row noGutters>
          <Col justify="center">
            <FriendsButton />
          </Col>
          <Col justify="center">
            <NotificationsButton />
          </Col>
          <Col justify="center">
            <SettingsButton />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
