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
          display: 'flex',
          width: '100%',
          position: 'absolute',
          zIndex: 2,
          left: 0,
          right: 0,
          overflow: 'hidden',
          backgroundColor: 'blue',
          top: '12%'
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
