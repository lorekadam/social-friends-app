import React, { Component } from 'react';
import Avatar from '../components/Avatar';
import { RowColumn, ColColumn } from '../styled/Grid';

export default class CenteredTop extends Component {
  render() {
    return (
      <RowColumn noGutters>
        <ColColumn align="center" justify="center">
          <Avatar />
        </ColColumn>
      </RowColumn>
    );
  }
}
