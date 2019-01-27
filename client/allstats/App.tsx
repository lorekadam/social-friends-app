import React from 'react';
import { AsyncStorage } from 'react-native';
import { createRootNavigator } from './src/navigation';
import { ApolloProvider } from 'react-apollo';
import createClient from './src/withData';
import Loader from './src/components/Loader';
import { createAppContainer } from 'react-navigation';

interface Props {}

interface State {
  token: string;
  signedIn: boolean;
  checkedSignIn: boolean;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      token: '',
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount = async () => {
    const jwt = await AsyncStorage.getItem('token');
    if (jwt) {
      this.setState({ token: jwt, signedIn: true, checkedSignIn: true });
    } else {
      this.setState({ checkedSignIn: true });
    }
  };

  render() {
    const { token, signedIn, checkedSignIn } = this.state;
    const RootNavigation = createRootNavigator(signedIn);
    const App = createAppContainer(RootNavigation);
    if (!checkedSignIn && token.length === 0) {
      return <Loader />;
    } else {
      return (
        <ApolloProvider client={createClient(token)}>
          {console.log(token)}
          <App />
        </ApolloProvider>
      );
    }
  }
}
