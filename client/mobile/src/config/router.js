import { connect } from 'react-redux';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import DashboardScreen from '../screens/Dashboard';
import CameraScreen from '../screens/Camera';
import FriendsScreen from '../screens/Friends';
import DuelsScreen from '../screens/Duels';
import TournamentsScreen from '../screens/Tournaments';
import LiguesScreen from '../screens/Ligues';

export const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

export const RootNavigator = createMaterialTopTabNavigator(
  {
    login: { screen: LoginScreen },
    register: { screen: RegisterScreen },
    main: {
      screen: createStackNavigator(
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

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');

const mapStateToProps = state => ({
  state: state.nav
});

export const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);
