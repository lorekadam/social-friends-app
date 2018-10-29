import React from 'react';
import AllStats from './src/AllStats';
import { ApolloProvider } from 'react-apollo';
import createClient from './src/withData';

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={createClient()}>
        <AllStats />
      </ApolloProvider>
    );
  }
}
