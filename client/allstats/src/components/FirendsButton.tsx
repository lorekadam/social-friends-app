import React, { Component } from 'react';
import { CircleButton } from '../styled/Buttons';
import { Feather } from '@expo/vector-icons';
import colors from '../styled/colors';

interface Props {
  size?: number;
}

export default class FriendsButton extends Component<Props, {}> {
  render() {
    const { size } = this.props;
    return (
      <CircleButton size={size ? size : 40}>
        <Feather color={colors.white} name="user" size={size ? size / 2 : 20} />
      </CircleButton>
    );
  }
}
