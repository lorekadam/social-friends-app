import React, { Component } from 'react';
import Avatar from '../components/Avatar';
import SocialButtons from './SocialButtons';
import { Row, Col } from '../styled/Grid';
import StartGameButton from './ControlButtons/StartGameButton';

export default class CenteredTop extends Component {
  render() {
    return (
      <Row height={100} noGutters align="center">
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
