import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator, StackNavigator } from 'react-navigation';
import { addListener } from './utils';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import DashboardScreen from '../screens/Dashboard';
import CameraScreen from '../screens/Camera';
import FriendsScreen from '../screens/Friends';
import DuelsScreen from '../screens/Duels';
import TournamentsScreen from '../screens/Tournaments';
import LiguesScreen from '../screens/Ligues';

export const AppNavigator = TabNavigator(
  {
    login: { screen: LoginScreen },
    register: { screen: RegisterScreen },
    main: {
      screen: StackNavigator(
        {
          dashboard: { screen: DashboardScreen },
          friends: { screen: FriendsScreen },
          duels: { screen: DuelsScreen },
          tournaments: { screen: TournamentsScreen },
          ligues: { screen: LiguesScreen },
          camera: { screen: CameraScreen }
        },
        {
          headerMode: 'none',
          navigationOptions: {
            headerVisible: false
          }
        }
      )
    }
  },
  {
    navigationOptions: {
      tabBarVisible: false,
      swipeEnabled: false,
      lazy: true
    }
  }
);

const RootNavigator = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({
      dispatch,
      state: nav,
      addListener
    })}
  />
);

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(RootNavigator);
