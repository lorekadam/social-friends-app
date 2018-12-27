import React, { Component } from 'react';
import { CircleButton } from '../styled/Buttons';
import { Ionicons } from '@expo/vector-icons';

export default class BackButton extends Component {
  render() {
    return (
      <CircleButton onPress={() => this.props.navigation()}>
        <Ionicons name="md-arrow-back" size={28} color="white" />
      </CircleButton>
    );
  }
}
