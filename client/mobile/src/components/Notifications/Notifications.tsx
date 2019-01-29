import React, { Component } from 'react';
import { FullView } from '../../styled/View';
import NotificationsList from './NotificationsList';

export default class Notifications extends Component {
  render() {
    return (
      <FullView>
        <NotificationsList />
      </FullView>
    );
  }
}
