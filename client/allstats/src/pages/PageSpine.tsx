import React, { Component } from 'react';
import styled from 'styled-components';
import { Constants } from 'expo';
import { PaddingView } from '../styled/View';
import ColorizedTop from '../components/ColorizedTop';
import CenteredTop from '../components/CenteredTop';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Settings from '../components/Settings';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  name: string;
  navigation: NavigationScreenProp<any, any>;
}

export const LOCAL_SETTINGS_QUERY = gql`
  query {
    settingsOpen @client
  }
`;

const MainView = styled.View`
  position: relative;
  margin-top: ${Constants.statusBarHeight};
  flex: 1;
  height: 100%;
  flex-direction: column;
`;

export default class PageSpine extends Component<Props, {}> {
  render() {
    return (
      <Query query={LOCAL_SETTINGS_QUERY}>
        {({ data }) => {
          return (
            <MainView>
              <ColorizedTop height="13%" />
              <CenteredTop />
              {data.settingsOpen && (
                <Settings navigation={this.props.navigation} />
              )}
              <PaddingView height="87%">{this.props.children}</PaddingView>
            </MainView>
          );
        }}
      </Query>
    );
  }
}
