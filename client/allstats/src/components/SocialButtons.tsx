import React, { Component } from 'react';
import { Row, Col } from '../styled/Grid';
import FriendsButton from './FirendsButton';
import NotificationsButton from './NotificationsButton';
import SettingsButton from './SettingsButton';

export default class SocialButtons extends Component {
  render() {
    return (
      <React.Fragment>
        <Row noGutters>
          <Col justify="center">
            <FriendsButton size={36} />
          </Col>
          <Col justify="center">
            <NotificationsButton size={36} />
          </Col>
          <Col justify="center">
            <SettingsButton size={36} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
