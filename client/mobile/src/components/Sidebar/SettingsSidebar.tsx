import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import { adopt } from 'react-adopt';
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
import { NavigationScreenProp } from 'react-navigation';
import { HOME_PAGE } from '../../navigation/pageTypes';
import Loader from '../Loader';
import { getRouteName } from '../../utils/getRouteName';
import { ME_QUERY, MY_UNREAD_NOTIFICATIONS } from '../../pages/PageSpine';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const LOCAL_TOGGLE_QUERY = gql`
  query {
    friendsOpen @client
    notificationsOpen @client
    settingsOpen @client
  }
`;

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

const Composed = adopt({
  me: ({ render }) => <Query query={ME_QUERY}>{render}</Query>,
  local: ({ render }) => <Query query={LOCAL_TOGGLE_QUERY}>{render}</Query>
});

export default class SettingsSidebar extends Component<Props, {}> {
  render() {
    const { navigation } = this.props;
    return (
      <Composed>
        {({ me, local }:any) => {
          const routeName = getRouteName(navigation.state);
          const { friendsOpen, notificationsOpen, settingsOpen } = local.data;
          return (
            <ScrollView>
              {me.loading || local.loading ? (
                <Loader />
              ) : (
                <RowColumn noGutters>
                  <SimpleView>
                    <QRCode
                      bgColor={colors.dark2}
                      fgColor={colors.light2}
                      value={me.data.id}
                    />
                  </SimpleView>
                  <FullView>
                    <AccordionHeadline
                      active={routeName === HOME_PAGE}
                      action={() => {
                        routeName === HOME_PAGE
                          ? navigation.closeDrawer()
                          : navigation.navigate(HOME_PAGE);
                      }}
                      title="Home"
                      icon="home"
                    />
                    <Mutation mutation={TOGGLE_NOTIFICATIONS_MUTATION}>
                      {(toggleNotification) => (
                        <Query query={MY_UNREAD_NOTIFICATIONS}>
                          {({ data, loading }) => {
                            if (loading) {
                              return <Loader />;
                            } else {
                              return (
                                <AccordionHeadline
                                  active={notificationsOpen}
                                  action={() => toggleNotification()}
                                  icon="mail"
                                  title="Notifications"
                                  badge={parseInt(
                                    data.unviewedNotifications.message
                                  )}
                                />
                              );
                            }
                          }}
                        </Query>
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
                    <Friends open={friendsOpen} />
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
              )}
            </ScrollView>
          );
        }}
      </Composed>
    );
  }
}
