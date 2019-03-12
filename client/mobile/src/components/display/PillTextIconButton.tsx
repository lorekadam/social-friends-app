import React, { Component } from 'react';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../styled/Buttons';
import { Text } from '../../styled/Text';
import colors from '../../styled/colors';

interface Props {
  full?: boolean;
  icon: string;
  text: string;
  size?: number;
  height?: number;
  buttonColor?: string;
  color?: string;
  action(): void;
}

export default class PillTextIconButton extends Component<Props, {}> {
  render() {
    const { full, icon, text, size, buttonColor, color, action } = this.props;
    return (
      <Button
        full={full || false}
        size={size || 'auto'}
        bgColor={buttonColor}
        onPress={() => action()}
      >
        <Text color={color || colors.white}>{text}</Text>
        <Feather
          style={{ marginLeft: 5 }}
          color={color || colors.white}
          size={size || 16}
          name={icon}
        />
      </Button>
    );
  }
}
