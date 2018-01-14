import React from 'react';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { StyleProvider } from 'native-base';

import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/commonColor';

import reducers from './reducers';

import LoginPage from './Pages/Login';

export default class Fstats extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}>
        <StyleProvider style={getTheme(variables)}>
          <LoginPage />
        </StyleProvider>
      </Provider>
    );
  }
}
