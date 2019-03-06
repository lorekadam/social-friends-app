import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator
} from 'react-navigation';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import ForgotPasswordPage from '../pages/ForgotPassword';
import HomePage from '../pages/Home';
import QRCodeScanner from '../pages/QRCodeScanner';
import * as pages from './pageTypes';
import FriendInvitePage from '../pages/FriendInvite';
import { width } from '../styled/globals';
import colors from '../styled/colors';
import SettingsSidebar from '../components/Sidebar/SettingsSidebar';
import FriendsPage from '../pages/Friends';

export const SignedOut = createSwitchNavigator(
  {
    [pages.LOGIN_PAGE]: {
      screen: LoginPage,
      title: pages.LOGIN_PAGE
    },
    [pages.REGISTER_PAGE]: {
      screen: RegisterPage,
      title: pages.REGISTER_PAGE
    },
    [pages.FORGOT_PASSWORD_PAGE]: {
      screen: ForgotPasswordPage,
      title: pages.FORGOT_PASSWORD_PAGE
    }
  },
  {
    initialRouteName: pages.LOGIN_PAGE
  }
);

export const SignedIn = createStackNavigator(
  {
    Main: {
      screen: createDrawerNavigator(
        {
          [pages.HOME_PAGE]: {
            screen: HomePage,
            title: pages.HOME_PAGE
          },
          [pages.FRIEND_INVITE_PAGE]: {
            screen: FriendInvitePage,
            title: pages.FRIEND_INVITE_PAGE
          },
          [pages.FRIENDS_PAGE]: {
            screen: FriendsPage,
            title: pages.FRIENDS_PAGE
          },
          [pages.QRCODESCANNER_PAGE]: {
            screen: QRCodeScanner,
            title: pages.QRCODESCANNER_PAGE
          }
        },
        {
          initialRouteName: pages.FRIENDS_PAGE,
          drawerWidth: width * 0.8,
          drawerBackgroundColor: colors.dark2,
          contentComponent: SettingsSidebar
        }
      )
    }
  },
  {
    headerMode: 'none'
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
