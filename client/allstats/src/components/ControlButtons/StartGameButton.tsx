import React, { Component } from 'react';
import PillTextIconButton from '../display/PillTextIconButton';

export default class StartGameButton extends Component {
  render() {
    return (
      <PillTextIconButton
        full
        text="START!"
        icon="play"
        action={() => console.log('start')}
      />
    );
  }
}
