import React from 'react';
import { connect } from 'react-redux';
import { Header, Left, Button, Icon, Body, Title, Right } from 'native-base';

import { HalfButton, StyledIcon, Flex, StyledText } from '../styled/StyledComponents';
import { navChange } from '../actions/navigationActions';

import * as types from '../actions/types';
import { unAuth } from '../actions/authActions';
import Screen from '../styled/Screen';

// @Auth
@connect()
export default class DashboardScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header>
          <Left>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Screen row>
          <HalfButton
            bgcolor="primary"
            onPress={() => this.props.dispatch(navChange(types.FRIENDS_SCREEN))}
          >
            <Flex aic>
              <StyledIcon fz="80" color="extra2" name="ios-people" />
              <StyledText color="extra2">Profile</StyledText>
            </Flex>
          </HalfButton>
          <HalfButton
            bgcolor="secondary"
            onPress={() => this.props.dispatch(navChange(types.DUELS_SCREEN))}
          >
            <Flex aic>
              <StyledIcon fz="80" color="extra2" type="MaterialCommunityIcons" name="soccer" />
              <StyledText color="extra2">Duels</StyledText>
            </Flex>
          </HalfButton>
          <HalfButton
            bgcolor="secondary"
            onPress={() => this.props.dispatch(navChange(types.TOURNAMENTS_SCREEN))}
          >
            <Flex aic>
              <StyledIcon fz="80" color="extra2" name="trophy" />
              <StyledText color="extra2">Tournaments</StyledText>
            </Flex>
          </HalfButton>
          <HalfButton
            bgcolor="primary"
            onPress={() => this.props.dispatch(navChange(types.LIGUES_SCREEN))}
          >
            <Flex aic>
              <StyledIcon fz="80" color="extra2" type="MaterialCommunityIcons" name="table-large" />
              <StyledText color="extra2">Ligues</StyledText>
            </Flex>
          </HalfButton>
          <HalfButton
            bgcolor="primary"
            onPress={() => this.props.dispatch(navChange(types.CAMERA_SCREEN))}
          >
            <Flex aic>
              <StyledIcon fz="80" color="extra2" name="md-camera" />
              <StyledText color="extra2">Scan statistics</StyledText>
            </Flex>
          </HalfButton>
          <HalfButton bgcolor="secondary" onPress={() => this.props.dispatch(unAuth())}>
            <Flex aic>
              <StyledIcon fz="80" color="extra2" name="log-out" />
              <StyledText color="extra2">Logout</StyledText>
            </Flex>
          </HalfButton>
        </Screen>
      </React.Fragment>
    );
  }
}
