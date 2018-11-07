import { createStackNavigator } from 'react-navigation';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';

export default createStackNavigator(
  {
    Login: {
      screen: LoginPage
    },
    Register: {
      screen: RegisterPage
    }
  },
  {
    initialRouteName: 'Login'
  }
);
