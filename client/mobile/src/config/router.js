import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator, StackNavigator } from 'react-navigation';
import { addListener } from './utils';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import DashboardScreen from '../screens/Dashboard';
import CameraScreen from '../screens/Camera';

export const AppNavigator = TabNavigator(
  {
    login: { screen: LoginScreen },
    register: { screen: RegisterScreen },
    main: {
      screen: StackNavigator(
        {
          dashboard: { screen: DashboardScreen },
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
