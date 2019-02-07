import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { RowColumn } from '../../styled/Grid';
import Friends from '../Friends/Friends';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';
import colors from '../../styled/colors';
import QRCode from 'react-native-qrcode';
import { FullView, SimpleView } from '../../styled/View';
import LogOutButton from '../ControlButtons/LogOutButton';
import AccordionHeadline from './AccordionHeadline';
import { ScrollView } from 'react-native';
import { Button } from '../../styled/Buttons';
import { Text } from '../../styled/Text';

interface Props {
  userId: string;
  friendsOpen: boolean;
  notificationsOpen: boolean;
  settingsOpen: boolean;
  closeDrawer: Function;
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
    const {
      userId,
      friendsOpen,
      notificationsOpen,
      settingsOpen,
      closeDrawer
    } = this.props;
    return (
      <ScrollView>
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
                <AccordionHeadline
                  active={notificationsOpen}
                  action={() => toggleNotification()}
                  icon="mail"
                  title="Notifications"
                />
              )}
            </Mutation>
            <Notifications open={notificationsOpen} />
            <Mutation mutation={TOGGLE_FRIENDS_MUTATION}>
              {(toggleFriends) => (
                <AccordionHeadline
                  active={friendsOpen}
                  action={() => toggleFriends()}
                  icon="users"
                  title="Friends"
                />
              )}
            </Mutation>
            <Friends open={friendsOpen} closeDrawer={closeDrawer} />
            <Mutation mutation={TOGGLE_SETTINGS_MUTATION}>
              {(toggleSettings) => (
                <AccordionHeadline
                  active={settingsOpen}
                  action={() => toggleSettings()}
                  icon="sliders"
                  title="Settings"
                />
              )}
            </Mutation>
            <Settings open={settingsOpen} />
          </FullView>
          <LogOutButton />
        </RowColumn>
      </ScrollView>
    );
  }
}
