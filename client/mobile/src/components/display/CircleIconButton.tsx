import React, { Component } from 'react';
import { CircleButton } from '../../styled/Buttons';
import { Feather } from '@expo/vector-icons';
import colors from '../../styled/colors';

interface Props {
  icon: string;
  iconSize?: number;
  size?: number;
  bgColor?: string;
  color?: string;
  action: any;
}

export default class CircleIconButton extends Component<Props, {}> {
  render() {
    const { icon, iconSize, size, bgColor, color, action } = this.props;
    return (
      <CircleButton
        size={size ? size : 38}
        bgColor={bgColor}
        onPress={() => action()}
      >
        <Feather
          color={color ? color : colors.white}
          name={icon}
          size={iconSize ? iconSize : 19}
        />
      </CircleButton>
    );
  }
}
