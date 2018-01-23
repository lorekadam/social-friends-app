import React from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { StyleProvider, getTheme, variables } from 'native-base';
import RootNavigator from './config/router';

import reducers from './reducers';

export default class Fstats extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <StyleProvider style={getTheme(variables)}>
          <RootNavigator />
        </StyleProvider>
      </Provider>
    );
  }
}
