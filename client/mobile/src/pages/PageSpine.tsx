import React, { Component } from 'react';
import styled from 'styled-components';
import { Constants } from 'expo';
import { adopt } from 'react-adopt';
import { PaddingView, FlexView } from '../styled/View';
import ColorizedTop from '../components/ColorizedTop';
import CenteredTop from '../components/CenteredTop';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RowColumn, ColColumn } from '../styled/Grid';
import Loader from '../components/Loader';
import SettingsSidebar from '../components/Sidebar/SettingsSidebar';

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
  margin-top: ${Constants.statusBarHeight};
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

export default class PageSpine extends Component<{}, State> {
  render() {
    return (
      <Composed>
        {({ user, localState }) => {
          const {
            sidebarOpen,
            friendsOpen,
            notificationsOpen,
            settingsOpen
          } = localState.data;
          return (
            <MainView>
              {user.loading || localState.loading ? (
                <Loader />
              ) : (
                <React.Fragment>
                  <RowColumn noGutters>
                    <ColColumn noGutters>
                      <FlexView>
                        <ColorizedTop>
                          <CenteredTop />
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
                  <SettingsSidebar
                    open={sidebarOpen}
                    userId={user.data.me.id}
                    friendsOpen={friendsOpen}
                    notificationsOpen={notificationsOpen}
                    settingsOpen={settingsOpen}
                  />
                </React.Fragment>
              )}
            </MainView>
          );
        }}
      </Composed>
    );
  }
}
