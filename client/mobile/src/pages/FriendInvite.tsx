import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import PageSpine from './PageSpine';
import FriendSearching from '../components/Friends/FriendSearching';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class FriendInvitePage extends Component<Props, {}> {
  render() {
    return (
      <PageSpine>
        <FriendSearching />
      </PageSpine>
    );
  }
}
