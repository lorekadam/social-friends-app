import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { StyleProvider, getTheme, variables } from 'native-base';
import { AppNavigator, navMiddleware } from './config/router';
import { main } from './config/globals';

import reducers from './reducers';

const client = new ApolloClient({
  uri: `${main}/graphql`
});

const logger = createLogger();

const store = createStore(reducers, applyMiddleware(navMiddleware, thunk, logger));

const Fstats = () => (
  <Provider store={store}>
    <StyleProvider style={getTheme(variables)}>
      <ApolloProvider client={client}>
        <AppNavigator />
      </ApolloProvider>
    </StyleProvider>
  </Provider>
);

export default Fstats;
