import React from 'react';
import { List } from 'native-base';
import { AbsoluteDropdown } from '../styled/AbsoluteDropdown';
import AcceptNotification from '../mutations/AcceptNotification';
import { StyledText } from '../styled/StyledComponents';

export default class NotificationsList extends React.Component {
  render() {
    return (
      <AbsoluteDropdown>
        {this.props.notifications.length > 0 ? (
          <List>
            {this.props.notifications.map((item, i) => (
              <AcceptNotification key={i} notification={item} />
            ))}
          </List>
        ) : (
          <StyledText>You don't have notifications</StyledText>
        )}
      </AbsoluteDropdown>
    );
  }
}
