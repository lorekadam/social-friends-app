import React from 'react';
import { AsyncStorage } from 'react-native';
import { createRootNavigator } from './src/navigation';
import { ApolloProvider } from 'react-apollo';
import createClient from './src/withData';
import Loader from './src/components/Loader';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
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
    if (!checkedSignIn) {
      return <Loader />;
    } else {
      return (
        <ApolloProvider client={createClient(token)}>
          <RootNavigation />
        </ApolloProvider>
      );
    }
  }
}
