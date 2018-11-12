import React from 'react';
import { AsyncStorage } from 'react-native';
import { createRootNavigator } from './src/navigation';
import { ApolloProvider } from 'react-apollo';
import createClient from './src/withData';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false
    };
  }

  componentDidMount = async () => {
    const jwt = await AsyncStorage.getItem('user');
    if (jwt) {
      this.setState({ signedIn: true, checkedSignIn: true });
    }
  };

  render() {
    const { signedIn } = this.state;
    const RootNavigation = createRootNavigator(signedIn);
    return (
      <ApolloProvider client={createClient()}>
        <RootNavigation />
      </ApolloProvider>
    );
  }
}
