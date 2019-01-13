import React, { Component } from 'react';
import CircleIconButton from './display/CircleIconButton';

export default class FriendsButton extends Component {
  render() {
    return <CircleIconButton action={() => console.log('users')} icon="user" />;
  }
}
