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
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount = async () => {
    const jwt = await AsyncStorage.getItem('user');
    if (jwt) {
      this.setState({ signedIn: true, checkedSignIn: true });
    } else {
      this.setState({ checkedSignIn: true });
    }
  };

  render() {
    const { signedIn, checkedSignIn } = this.state;
    const RootNavigation = createRootNavigator(signedIn);
    if (!checkedSignIn) {
      return <Loader />;
    } else {
      return (
        <ApolloProvider client={createClient()}>
          <RootNavigation />
        </ApolloProvider>
      );
    }
  }
}
