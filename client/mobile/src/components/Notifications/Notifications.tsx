import React, { Component } from 'react';
import { FullView } from '../../styled/View';
import NotificationsList from './NotificationsList';
import { View } from 'react-native';

export default class Notifications extends Component {
  render() {
    return (
      <FullView
        onLayout={(e) => {
          console.log(e.nativeEvent.layout.height);
          this.props.setHeight(e.nativeEvent.layout.height);
        }}
        style={{
          backgroundColor: 'red'
        }}
      >
        <NotificationsList />
      </FullView>
    );
  }
}
