import React from 'react';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { StyleProvider, getTheme, variables } from 'native-base';
import RootNavigator from './config/router';

import reducers from './reducers';
import { navMiddleware } from './config/utils';

const store = createStore(reducers, applyMiddleware(navMiddleware));

export default class Fstats extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(variables)}>
          <RootNavigator />
        </StyleProvider>
      </Provider>
    );
  }
}
