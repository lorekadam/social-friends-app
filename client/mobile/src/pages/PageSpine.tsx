import React, { Component } from 'react';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import styled from 'styled-components';
import { adopt } from 'react-adopt';
import { PaddingView, FlexView } from '../styled/View';
import ColorizedTop from '../components/ColorizedTop';
import CenteredTop from '../components/CenteredTop';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RowColumn, ColColumn } from '../styled/Grid';
import Loader from '../components/Loader';
import SettingsSidebar from '../components/Sidebar/SettingsSidebar';
import { width } from '../styled/globals';
import colors from '../styled/colors';
import SideMenuToggle from '../components/ControlButtons/SideMenuToggle';

export const LOCAL_TOGGLE_QUERY = gql`
  query {
    sidebarOpen @client
    friendsOpen @client
    notificationsOpen @client
    settingsOpen @client
  }
`;

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
    }
  }
`;

export const MainView = styled.View`
  display: flex;
  position: relative;
  flex: 1;
  height: 100%;
  flex-direction: column;
`;

const Composed = adopt({
  user: ({ render }) => <Query query={ME_QUERY}>{render}</Query>,
  localState: ({ render }) => <Query query={LOCAL_TOGGLE_QUERY}>{render}</Query>
});

export default class PageSpine extends Component {
  drawerRef: any;
  render() {
    return (
      <Composed>
        {({ user, localState }) => {
          const {
            friendsOpen,
            notificationsOpen,
            settingsOpen
          } = localState.data;
          if (user.loading || localState.loading) {
            return <Loader />;
          } else {
            return (
              <DrawerLayout
                ref={(drawer) => {
                  this.drawerRef = drawer;
                }}
                drawerWidth={width * 0.8}
                drawerType="front"
                drawerBackgroundColor={colors.dark2}
                renderNavigationView={() => (
                  <SettingsSidebar
                    userId={user.data.me.id}
                    friendsOpen={friendsOpen}
                    notificationsOpen={notificationsOpen}
                    settingsOpen={settingsOpen}
                  />
                )}
              >
                <MainView>
                  <React.Fragment>
                    <RowColumn noGutters>
                      <ColColumn noGutters>
                        <FlexView>
                          <ColorizedTop>
                            <CenteredTop />
                            <SideMenuToggle
                              openDrawer={() => this.drawerRef.openDrawer()}
                            />
                          </ColorizedTop>
                        </FlexView>
                      </ColColumn>
                      <ColColumn noGutters flex={2}>
                        <PaddingView
                          style={{ zIndex: 1, backgroundColor: 'gray' }}
                        >
                          {this.props.children}
                        </PaddingView>
                      </ColColumn>
                    </RowColumn>
                  </React.Fragment>
                </MainView>
              </DrawerLayout>
            );
          }
        }}
      </Composed>
    );
  }
}
