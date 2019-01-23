import React, { Component } from 'react';
import { PaddingView } from '../../styled/View';
import FriendInvitation from './FriendInvitation';
import FriendList from './FriendList';
import SlideDown from '../Animations/SlideDown';

export default class Friends extends Component {
  render() {
    return (
      <SlideDown
        style={{
          // position: 'absolute',
          zIndex: 1,
          left: 0,
          right: 0,
          overflow: 'hidden'
        }}
      >
        <PaddingView>
          <FriendInvitation />
          <FriendList />
        </PaddingView>
      </SlideDown>
    );
  }
}
