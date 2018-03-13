import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../config/router';

const firstAction = AppNavigator.router.getActionForPathAndParams('Register');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');

const initialNavState = AppNavigator.router.getStateForAction(secondAction, tempNavState);

export default function nav(state = initialNavState, action) {
  let nextState;
  switch (action.type) {
    case 'LOGIN_SCREEN':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    case 'REGISTER_SCREEN':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Register' }),
        state
      );
      break;
    case 'DASHBOARD_SCREEN':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Dashboard' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}
