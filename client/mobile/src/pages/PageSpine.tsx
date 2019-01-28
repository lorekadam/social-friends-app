import React, { Component } from 'react';
import styled from 'styled-components';
import { Constants } from 'expo';
import { adopt } from 'react-adopt';
import { PaddingView } from '../styled/View';
import ColorizedTop from '../components/ColorizedTop';
import CenteredTop from '../components/CenteredTop';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Settings from '../components/Settings/Settings';
import Friends from '../components/Friends/Friends';
import Notifications from '../components/Notifications/Notifications';
import { View } from 'react-native';
import { RowColumn, ColColumn } from '../styled/Grid';
import SlideDown from '../components/Animations/SlideDown';
import Loader from '../components/Loader';

interface State {
  top: number;
}

export const LOCAL_TOGGLE_QUERY = gql`
  query {
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
  state = {
    top: 0
  };
  render() {
    return (
      <Composed>
        {({ user, localState }) => {
          const {
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
                      <View
                        onLayout={(e) =>
                          this.setState({ top: e.nativeEvent.layout.height })
                        }
                        style={{ width: '100%', height: '100%' }}
                      >
                        <ColorizedTop />
                        <CenteredTop />
                      </View>
                    </ColColumn>
                    <ColColumn noGutters flex={5}>
                      <PaddingView
                        style={{ zIndex: 1, backgroundColor: 'gray' }}
                      >
                        {this.props.children}
                      </PaddingView>
                    </ColColumn>
                  </RowColumn>
                  {(friendsOpen || notificationsOpen || settingsOpen) && (
                    <SlideDown top={this.state.top}>
                      {friendsOpen && <Friends />}
                      {notificationsOpen && <Notifications />}
                      {settingsOpen && <Settings id={user.data.me.id} />}
                    </SlideDown>
                  )}
                </React.Fragment>
              )}
            </MainView>
          );
        }}
      </Composed>
    );
  }
}
