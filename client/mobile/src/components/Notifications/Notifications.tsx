import React, { Component } from 'react';
import NotificationsList from './NotificationsList';
import Accordion from '../Animations/Accordion';

interface Props {
  open: boolean;
}

export default class Notifications extends Component<Props, {}> {
  render() {
    return (
      <Accordion open={this.props.open}>
        <NotificationsList />
      </Accordion>
    );
  }
}
