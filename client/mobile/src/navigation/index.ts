import { createSwitchNavigator } from 'react-navigation';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import ForgotPasswordPage from '../pages/ForgotPassword';
import ProfilePage from '../pages/Profile';
import * as pages from './pageTypes';

export const SignedOut = createSwitchNavigator(
  {
    Login: {
      screen: LoginPage,
      title: pages.LOGIN_PAGE
    },
    Register: {
      screen: RegisterPage,
      title: pages.REGISTER_PAGE
    },
    ForgotPassword: {
      screen: ForgotPasswordPage,
      title: pages.FORGOT_PASSWORD_PAGE
    }
  },
  {
    initialRouteName: pages.LOGIN_PAGE
  }
);

export const SignedIn = createSwitchNavigator(
  {
    Profile: {
      screen: ProfilePage,
      title: pages.PROFILE_PAGE
    }
  },
  {
    initialRouteName: pages.PROFILE_PAGE
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
