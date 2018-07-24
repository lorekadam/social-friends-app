import { NavigationActions } from 'react-navigation';

import { RootNavigator } from '../config/router';

import * as types from '../actions/types';

const firstAction = RootNavigator.router.getActionForPathAndParams('register');
const tempNavState = RootNavigator.router.getStateForAction(firstAction);
const secondAction = RootNavigator.router.getActionForPathAndParams('login');

const initialNavState = RootNavigator.router.getStateForAction(secondAction, tempNavState);

export default function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case types.BACK: {
      nextState = RootNavigator.router.getStateForAction(NavigationActions.back(), state);
      break;
    }
    case types.LOGIN_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'login' }),
        state
      );
      break;
    }
    case types.REGISTER_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'register' }),
        state
      );
      break;
    }
    case types.DASHBOARD_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'dashboard' }),
        state
      );
      break;
    }
    case types.CAMERA_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'camera' }),
        state
      );
      break;
    }
    case types.FRIENDS_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'friends' }),
        state
      );
      break;
    }
    case types.DUELS_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'duels' }),
        state
      );
      break;
    }
    case types.TOURNAMENTS_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'tournaments' }),
        state
      );
      break;
    }
    case types.LIGUES_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ligues' }),
        state
      );
      break;
    }
    default:
      nextState = RootNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}
