import React, { Component } from 'react';
import { Button } from '../styled/Buttons';
import { Text } from '../styled/Text';
import colors from '../styled/colors';
import { Feather } from '@expo/vector-icons';

export default class StartGameButton extends Component {
  render() {
    return (
      <Button>
        <Text color={colors.white}>START</Text>
        <Feather
          style={{ marginLeft: 5 }}
          color={colors.white}
          size={16}
          name="play"
        />
      </Button>
    );
  }
}
