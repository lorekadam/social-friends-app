import { createSwitchNavigator } from 'react-navigation';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import ForgotPasswordPage from '../pages/ForgotPassword';
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
    },
    ForgotPassword: {
      screen: ForgotPasswordPage,
      title: 'ForgotPassword'
    }
  },
  {
    initialRouteName: 'Login'
  }
);

export const SignedIn = createSwitchNavigator(
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
