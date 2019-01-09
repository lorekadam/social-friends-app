import React, { Component } from 'react';
import { CircleButton } from '../styled/Buttons';
import { Ionicons } from '@expo/vector-icons';

export default class Settings extends Component {
  render() {
    return (
      <CircleButton>
        <Ionicons name="md-cog" size={28} color="white" />
      </CircleButton>
    );
  }
}
