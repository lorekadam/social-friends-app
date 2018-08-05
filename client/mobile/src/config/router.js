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
import DuelsScreen from '../screens/Duels';
import TournamentsScreen from '../screens/Tournaments';
import LiguesScreen from '../screens/Ligues';
import AddGame from '../screens/AddGame';

import * as types from '../actions/types';
import ProfileScreen from '../screens/Profile';

export const navMiddleware = createReactNavigationReduxMiddleware('root', state => state.nav);

export const RootNavigator = createMaterialTopTabNavigator(
  {
    [types.LOGIN_SCREEN]: { screen: LoginScreen },
    [types.REGISTER_SCREEN]: { screen: RegisterScreen },
    main: {
      screen: createStackNavigator(
        {
          [types.DASHBOARD_SCREEN]: { screen: DashboardScreen },
          [types.PROFILE_SCREEN]: { screen: ProfileScreen },
          [types.DUELS_SCREEN]: { screen: DuelsScreen },
          [types.TOURNAMENTS_SCREEN]: { screen: TournamentsScreen },
          [types.LIGUES_SCREEN]: { screen: LiguesScreen },
          [types.CAMERA_SCREEN]: { screen: CameraScreen },
          [types.ADD_GAME_SCREEN]: { screen: AddGame }
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
