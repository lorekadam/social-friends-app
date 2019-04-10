import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { PaddingView, FlexView } from '../styled/View';
import ColorizedTop from '../components/ColorizedTop';
import CenteredTop from '../components/CenteredTop';
import { RowColumn, ColColumn } from '../styled/Grid';
import Loader from '../components/Loader';
import SideMenuToggle from '../components/ControlButtons/SideMenuToggle';
import FillUserName from '../components/FillUserName';
import { statusBarHeight } from '../styled/globals';

export const LOCAL_TOGGLE_QUERY = gql`
  query {
    friendsOpen @client
    notificationsOpen @client
    settingsOpen @client
  }
`;

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
    }
  }
`;

export const MY_UNREAD_NOTIFICATIONS = gql`
  query MY_UNREAD_NOTIFICATIONS {
    unviewedNotifications {
      message
    }
  }
`;

export const MainView = styled.View`
  display: flex;
  position: relative;
  flex: 1;
  height: 100%;
  flex-direction: column;
  margin-top: ${statusBarHeight};
`;

export default class PageSpine extends Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }
          if (data.me.name === null || data.me.name.length === 0) {
            return <FillUserName />;
          }
          return (
            <MainView>
              <React.Fragment>
                <RowColumn noGutters>
                  <ColColumn noGutters>
                    <FlexView>
                      <ColorizedTop>
                        <CenteredTop userId={data.me.id} />
                        <Query query={MY_UNREAD_NOTIFICATIONS}>
                          {({ data, loading }) => {
                            if (loading) {
                              return <Loader />;
                            }
                            return (
                              <SideMenuToggle
                                notifications={parseInt(
                                  data.unviewedNotifications.message
                                )}
                              />
                            );
                          }}
                        </Query>
                      </ColorizedTop>
                    </FlexView>
                  </ColColumn>
                  <ColColumn noGutters flex={2}>
                    <PaddingView style={{ zIndex: 1, backgroundColor: 'gray' }}>
                      {this.props.children}
                    </PaddingView>
                  </ColColumn>
                </RowColumn>
              </React.Fragment>
            </MainView>
          );
        }}
      </Query>
    );
  }
}
