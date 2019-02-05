import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Sidebar from './Sidebar';
import { RowColumn, ColColumn } from '../../styled/Grid';
import Friends from '../Friends/Friends';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';
import { TitleDropdown } from '../../styled/TitleDropdown';
import { Text } from '../../styled/Text';
import colors from '../../styled/colors';
import Accordion from '../Animations/Accordion';
import { FullView } from '../../styled/View';

interface Props {
  open: boolean;
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
  state = {
    notificationsHeight: 0
  };
  render() {
    const {
      open,
      userId,
      friendsOpen,
      notificationsOpen,
      settingsOpen
    } = this.props;
    return (
      <Sidebar open={open}>
        <RowColumn>
          <ColColumn direction="column">
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
            {/* <Accordion
              open={notificationsOpen}
              toHeight={this.state.notificationsHeight}
            >
            </Accordion> */}
            <Notifications
              setHeight={(h) => {
                this.setState({
                  notificationsHeight: h
                });
              }}
            />
          </ColColumn>
          <ColColumn direction="column">
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
            <Accordion open={friendsOpen} toHeight={200}>
              <Friends />
            </Accordion>
          </ColColumn>
          <ColColumn>
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
            <Accordion open={settingsOpen} toHeight={200}>
              <Settings id={userId} />
            </Accordion>
          </ColColumn>
        </RowColumn>
      </Sidebar>
    );
  }
}
