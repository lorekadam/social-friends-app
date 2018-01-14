import React from 'react';
import Expo, { AppLoading } from 'expo';

import Fstats from './src/Fstats';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsAreLoaded: false
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
    });
    this.setState({
      fontsAreLoaded: true
    });
  }
  render() {
    return this.state.fontsAreLoaded === true ? <Fstats /> : <AppLoading />;
  }
}
