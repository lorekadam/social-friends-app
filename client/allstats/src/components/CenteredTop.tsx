import React, { Component } from 'react';
import Avatar from '../components/Avatar';
import MainButtons from '../components/MainButtons';
import { Row, Col } from '../styled/Grid';

export default class CenteredTop extends Component {
  render() {
    return (
      <Row align="center" style={{ marginTop: -60 }}>
        <Col justify="center">
          <Avatar />
        </Col>
        <Col justify="space-between">
          <MainButtons />
        </Col>
      </Row>
    );
  }
}
