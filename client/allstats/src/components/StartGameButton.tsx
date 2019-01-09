import React, { Component } from 'react';
import { CircleButton } from '../styled/Buttons';
import { Text } from '../styled/Text';

export default class StartGameButton extends Component {
  render() {
    return (
      <CircleButton size={40}>
        <Text>START!</Text>
      </CircleButton>
    );
  }
}
