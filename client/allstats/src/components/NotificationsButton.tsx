import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { CircleButton } from '../styled/Buttons';

export default class NotificationsButton extends Component {
  render() {
    return (
      <CircleButton size={40}>
        <Ionicons name="md-mail" size={20} />
      </CircleButton>
    );
  }
}
