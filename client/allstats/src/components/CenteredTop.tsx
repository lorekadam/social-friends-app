import React, { Component } from 'react';
import Avatar from '../components/Avatar';
import SocialButtons from './SocialButtons';
import { Row, Col } from '../styled/Grid';
import StartGameButton from './StartGameButton';
import { avatarDimension } from '../styled/globals';

export default class CenteredTop extends Component {
  render() {
    return (
      <Row align="center" style={{ marginTop: (avatarDimension / 2) * -1 }}>
        <Col>
          <StartGameButton />
        </Col>
        <Col justify="center">
          <Avatar />
        </Col>
        <Col>
          <SocialButtons />
        </Col>
      </Row>
    );
  }
}
