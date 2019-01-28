import React, { Component } from 'react';
import { CircleButton } from '../../styled/Buttons';
import { Feather } from '@expo/vector-icons';
import colors from '../../styled/colors';

interface Props {
  icon: string;
  size?: number;
  buttonColor?: string;
  color?: string;
  action(): void;
}

export default class CircleIconButton extends Component<Props, {}> {
  render() {
    const { icon, size, buttonColor, color, action } = this.props;
    return (
      <CircleButton
        size={size ? size : 38}
        bgc={buttonColor}
        onPress={() => action()}
      >
        <Feather
          color={color ? color : colors.white}
          name={icon}
          size={size ? size / 2 : 19}
        />
      </CircleButton>
    );
  }
}
