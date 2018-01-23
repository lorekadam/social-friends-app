import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Register from '../screens/Register';
import Login from '../screens/Login';

export const Tabs = TabNavigator({
  Register: {
    screen: Register
  },
  Login: {
    screen: Login
  }
});

const RootNavigator = StackNavigator({
  Register: {
    screen: Register
  },
  Login: {
    screen: Login
  }
});

export default RootNavigator;
