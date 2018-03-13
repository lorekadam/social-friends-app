import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { StyleProvider, getTheme, variables } from 'native-base';
import RootNavigator from './config/router';

import reducers from './reducers';
import { navMiddleware } from './config/utils';

const store = createStore(reducers, applyMiddleware(navMiddleware));

const Fstats = () => (
  <Provider store={store}>
    <StyleProvider style={getTheme(variables)}>
      <RootNavigator />
    </StyleProvider>
  </Provider>
);

export default Fstats;
