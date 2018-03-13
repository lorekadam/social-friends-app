import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, TabNavigator } from 'react-navigation';
import { addListener } from './utils';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import DashboardScreen from '../screens/Dashboard';

export const AppNavigator = TabNavigator(
  {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    Dashboard: { screen: DashboardScreen }
  },
  {
    navigationOptions: {
      tabBarVisible: false
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
