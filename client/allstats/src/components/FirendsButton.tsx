import React, { Component } from 'react';
import { CircleButton } from '../styled/Buttons';
import { Ionicons } from '@expo/vector-icons';

export default class FriendsButton extends Component {
  render() {
    return (
      <CircleButton size={40}>
        <Ionicons name="md-person" size={20} />
      </CircleButton>
    );
  }
}
