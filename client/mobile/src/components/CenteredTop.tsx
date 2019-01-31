import React, { Component } from 'react';
import Avatar from '../components/Avatar';
import SocialButtons from './SocialButtons';
import { RowColumn, ColColumn } from '../styled/Grid';
import StartGameButton from './ControlButtons/StartGameButton';

export default class CenteredTop extends Component {
  render() {
    return (
      <RowColumn noGutters>
        <ColColumn align="center">
          <SocialButtons />
        </ColColumn>
        <ColColumn align="center" flex={3} justify="center">
          <Avatar />
        </ColColumn>
      </RowColumn>
    );
  }
}

{
  /* <ColColumn>
  <StartGameButton />
</ColColumn> */
}
