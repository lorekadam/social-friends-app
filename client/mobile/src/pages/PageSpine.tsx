import React, { Component } from 'react';
import styled from 'styled-components';
import { PaddingView, FlexView } from '../styled/View';
import ColorizedTop from '../components/ColorizedTop';
import CenteredTop from '../components/CenteredTop';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { RowColumn, ColColumn } from '../styled/Grid';
import Loader from '../components/Loader';
import SideMenuToggle from '../components/ControlButtons/SideMenuToggle';
import FillUserName from '../components/FillUserName';

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

export const MainView = styled.View`
  display: flex;
  position: relative;
  flex: 1;
  height: 100%;
  flex-direction: column;
`;

export default class PageSpine extends Component {
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          } else {
            if (data.me.name === null || data.me.name.length === 0) {
              return <FillUserName />;
            } else {
              return (
                <MainView>
                  <React.Fragment>
                    <RowColumn noGutters>
                      <ColColumn noGutters>
                        <FlexView>
                          <ColorizedTop>
                            <CenteredTop userId={data.me.id} />
                            <SideMenuToggle />
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
              );
            }
          }
        }}
      </Query>
    );
  }
}
