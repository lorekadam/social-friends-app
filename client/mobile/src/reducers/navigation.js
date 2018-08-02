import { NavigationActions } from 'react-navigation';

import { RootNavigator } from '../config/router';

import * as types from '../actions/types';

const firstAction = RootNavigator.router.getActionForPathAndParams(types.REGISTER_SCREEN);
const tempNavState = RootNavigator.router.getStateForAction(firstAction);
const secondAction = RootNavigator.router.getActionForPathAndParams(types.LOGIN_SCREEN);

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
        NavigationActions.navigate({ routeName: types.LOGIN_SCREEN }),
        state
      );
      break;
    }
    case types.REGISTER_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: types.REGISTER_SCREEN }),
        state
      );
      break;
    }
    case types.DASHBOARD_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: types.DASHBOARD_SCREEN }),
        state
      );
      break;
    }
    case types.CAMERA_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: types.CAMERA_SCREEN }),
        state
      );
      break;
    }
    case types.FRIENDS_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: types.FRIENDS_SCREEN }),
        state
      );
      break;
    }
    case types.DUELS_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: types.DUELS_SCREEN }),
        state
      );
      break;
    }
    case types.TOURNAMENTS_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: types.TOURNAMENTS_SCREEN }),
        state
      );
      break;
    }
    case types.LIGUES_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: types.LIGUES_SCREEN }),
        state
      );
      break;
    }
    case types.ADD_GAME_SCREEN: {
      nextState = RootNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: types.ADD_GAME_SCREEN }),
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
