import React from 'react';
import { AsyncStorage } from 'react-native';
import { createRootNavigator } from './src/navigation';
import { ApolloProvider } from 'react-apollo';
import createClient from './src/withData';
import Loader from './src/components/Loader';
import { createAppContainer } from 'react-navigation';
import { Font } from 'expo';

interface Props {}

interface State {
  token: string;
  signedIn: boolean;
  checkedSignIn: boolean;
}

export default class App extends React.Component<Props, State> {
  state = {
    token: '',
    signedIn: false,
    checkedSignIn: false
  };

  async componentDidMount() {
    await Font.loadAsync({
      'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
      'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
      roboto: require('./assets/fonts/Roboto-Regular.ttf')
    });
    const jwt = await AsyncStorage.getItem('token');
    console.log(jwt);
    if (jwt && jwt.length > 0) {
      this.setState({ token: jwt, signedIn: true, checkedSignIn: true });
    } else {
      this.setState({ checkedSignIn: true });
    }
  }

  render() {
    const { signedIn, checkedSignIn } = this.state;
    const RootNavigation = createRootNavigator(signedIn);
    const App = createAppContainer(RootNavigation);
    if (!checkedSignIn) {
      return <Loader />;
    } else {
      return (
        <ApolloProvider client={createClient()}>
          <App />
        </ApolloProvider>
      );
    }
  }
}
