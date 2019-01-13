import React, { Component } from 'react';
import CircleIconButton from './display/CircleIconButton';

export default class NotificationsButton extends Component {
  render() {
    return (
      <CircleIconButton
        icon="mail"
        action={() => console.log('notifications')}
      />
    );
  }
}
