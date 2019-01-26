import React, { Component } from 'react';
import styled from 'styled-components';
import { Constants } from 'expo';
import { PaddingView } from '../styled/View';
import ColorizedTop from '../components/ColorizedTop';
import CenteredTop from '../components/CenteredTop';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Settings from '../components/Settings/Settings';
import { NavigationScreenProp } from 'react-navigation';
import Friends from '../components/Friends/Friends';
import Notifications from '../components/Notifications/Notifications';
import { View } from 'react-native';
import { RowColumn, ColColumn } from '../styled/Grid';
import SlideDown from '../components/Animations/SlideDown';

interface Props {
  name: string;
  navigation: NavigationScreenProp<any, any>;
}

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

const MainView = styled.View`
  margin-top: ${Constants.statusBarHeight};
  display: flex;
  position: relative;
  flex: 1;
  height: 100%;
  flex-direction: column;
`;

export default class PageSpine extends Component<Props, State> {
  state = {
    top: 0
  };
  render() {
    return (
      <Query query={LOCAL_TOGGLE_QUERY}>
        {({ data }) => {
          return (
            <MainView>
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
                  <PaddingView style={{ zIndex: 1, backgroundColor: 'gray' }}>
                    {this.props.children}
                  </PaddingView>
                </ColColumn>
              </RowColumn>
              {(data.friendsOpen ||
                data.notificationsOpen ||
                data.settingsOpen) && (
                <SlideDown top={this.state.top}>
                  {data.friendsOpen && <Friends />}
                  {data.notificationsOpen && <Notifications />}
                  {data.settingsOpen && <Settings />}
                </SlideDown>
              )}
            </MainView>
          );
        }}
      </Query>
    );
  }
}
