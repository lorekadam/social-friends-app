import React, { Component } from 'react';
import { Feather } from '@expo/vector-icons';
import { StyleProp } from 'react-native';
import { CircleButton } from '../../styled/Buttons';
import colors from '../../styled/colors';

interface Props {
  icon: string;
  iconSize?: number;
  size?: number;
  bgColor?: string;
  color?: string;
  action: any;
  style?: StyleProp<any>;
}

export default class CircleIconButton extends Component<Props, {}> {
  render() {
    const { icon, iconSize, size, bgColor, color, action, style } = this.props;
    return (
      <CircleButton
        size={size || 38}
        bgColor={bgColor}
        onPress={() => action()}
        style={{ ...style }}
      >
        <Feather
          color={color || colors.white}
          name={icon}
          size={iconSize || 19}
        />
      </CircleButton>
    );
  }
}
