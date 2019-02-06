import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { RowColumn } from '../../styled/Grid';
import Friends from '../Friends/Friends';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';
import { TitleDropdown } from '../../styled/TitleDropdown';
import { Text } from '../../styled/Text';
import colors from '../../styled/colors';
import QRCode from 'react-native-qrcode';
import { FullView, SimpleView } from '../../styled/View';
import LogOutButton from '../ControlButtons/LogOutButton';

interface Props {
  userId: string;
  friendsOpen: boolean;
  notificationsOpen: boolean;
  settingsOpen: boolean;
}

const TOGGLE_FRIENDS_MUTATION = gql`
  mutation {
    toggleFriends @client
  }
`;

const TOGGLE_NOTIFICATIONS_MUTATION = gql`
  mutation {
    toggleNotifications @client
  }
`;

export const TOGGLE_SETTINGS_MUTATION = gql`
  mutation {
    toggleSettings @client
  }
`;

export default class SettingsSidebar extends Component<Props, {}> {
  render() {
    const { userId, friendsOpen, notificationsOpen, settingsOpen } = this.props;
    return (
      <RowColumn noGutters>
        <SimpleView>
          <QRCode
            bgColor={colors.dark2}
            fgColor={colors.light2}
            value={userId}
          />
        </SimpleView>
        <FullView>
          <Mutation mutation={TOGGLE_NOTIFICATIONS_MUTATION}>
            {(toggleNotification) => (
              <TitleDropdown
                active={notificationsOpen}
                onPress={() => toggleNotification()}
              >
                <Text size={16} color={colors.light1}>
                  Notifications
                </Text>
              </TitleDropdown>
            )}
          </Mutation>
          <Notifications open={notificationsOpen} />
          <Mutation mutation={TOGGLE_FRIENDS_MUTATION}>
            {(toggleFriends) => (
              <TitleDropdown
                active={friendsOpen}
                onPress={() => toggleFriends()}
              >
                <Text size={16} color={colors.light1}>
                  Friends
                </Text>
              </TitleDropdown>
            )}
          </Mutation>
          <Friends open={friendsOpen} />

          <Mutation mutation={TOGGLE_SETTINGS_MUTATION}>
            {(toggleSettings) => (
              <TitleDropdown
                active={settingsOpen}
                onPress={() => toggleSettings()}
              >
                <Text size={16} color={colors.light1}>
                  Settings
                </Text>
              </TitleDropdown>
            )}
          </Mutation>
          <Settings open={settingsOpen} />
        </FullView>
        <LogOutButton />
      </RowColumn>
    );
  }
}
