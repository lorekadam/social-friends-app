import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../config/router';

import * as types from '../actions/types';

const firstAction = AppNavigator.router.getActionForPathAndParams('register');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('login');

const initialNavState = AppNavigator.router.getStateForAction(secondAction, tempNavState);

export default function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case types.LOGIN_SCREEN:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'login' }),
        state
      );
      break;
    case types.REGISTER_SCREEN:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'register' }),
        state
      );
      break;
    case types.DASHBOARD_SCREEN:
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'dashboard' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}
