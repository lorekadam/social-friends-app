import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { StyleProvider, getTheme, variables } from 'native-base';
import { AppNavigator, navMiddleware } from './config/router';

import reducers from './reducers';

const logger = createLogger();

const store = createStore(reducers, applyMiddleware(navMiddleware, thunk, logger));

const Fstats = () => (
  <Provider store={store}>
    <StyleProvider style={getTheme(variables)}>
      <AppNavigator />
    </StyleProvider>
  </Provider>
);

export default Fstats;
