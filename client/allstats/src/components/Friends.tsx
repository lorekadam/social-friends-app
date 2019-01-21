import React, { Component } from 'react';
import { PaddingView } from '../styled/View';
import FriendInvitation from './FriendInvitation';
import FriendList from './FriendList';

export default class Friends extends Component {
  render() {
    return (
      <PaddingView>
        <FriendInvitation />
        <FriendList />
      </PaddingView>
    );
  }
}
