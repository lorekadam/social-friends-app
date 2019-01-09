import React, { Component } from 'react';
import { CircleButton } from '../styled/Buttons';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  navigation: Function;
}

export default class BackButton extends Component<Props> {
  render() {
    return (
      <CircleButton
        style={{ position: 'absolute', top: 10, left: 10 }}
        onPress={() => this.props.navigation()}
      >
        <Ionicons name="md-arrow-back" size={28} color="white" />
      </CircleButton>
    );
  }
}
