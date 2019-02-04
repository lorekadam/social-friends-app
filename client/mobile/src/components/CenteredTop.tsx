import React, { Component } from 'react';
import Avatar from '../components/Avatar';
import { RowColumn, ColColumn } from '../styled/Grid';
import SideMenuToggle from './ControlButtons/SideMenuToggle';

export default class CenteredTop extends Component {
  render() {
    return (
      <RowColumn noGutters>
        <ColColumn align="center" justify="center">
          <Avatar />
        </ColColumn>
        <SideMenuToggle />
      </RowColumn>
    );
  }
}
