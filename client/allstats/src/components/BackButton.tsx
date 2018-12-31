import React, { Component } from 'react';
import { CircleButton } from '../styled/Buttons';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  navigation: Function
}

export default class BackButton extends Component<Props> {
  render() {
    return (
      <CircleButton onPress={() => this.props.navigation()}>
        <Ionicons name="md-arrow-back" size={28} color="white" />
      </CircleButton>
    );
  }
}
