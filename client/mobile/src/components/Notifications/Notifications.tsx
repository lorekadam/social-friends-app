import React, { Component } from 'react';
import { PaddingView } from '../../styled/View';
import NotificationsList from './NotificationsList';
import Accordion from '../Animations/Accordion';

interface Props {
  open: boolean;
}

export default class Notifications extends Component<Props, {}> {
  render() {
    return (
      <Accordion open={this.props.open}>
        <PaddingView padding={5}>
          <NotificationsList />
        </PaddingView>
      </Accordion>
    );
  }
}
