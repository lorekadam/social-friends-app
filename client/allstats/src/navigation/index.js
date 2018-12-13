import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import ProfilePage from '../pages/Profile';

export const SignedOut = createSwitchNavigator(
  {
    Login: {
      screen: LoginPage,
      title: 'Login'
    },
    Register: {
      screen: RegisterPage,
      title: 'Register'
    }
  },
  {
    initialRouteName: 'Login'
  }
);

export const SignedIn = createStackNavigator(
  {
    Profile: {
      screen: ProfilePage,
      title: 'Profile'
    }
  },
  {
    initialRouteName: 'Profile'
  }
);

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut'
    }
  );
};
