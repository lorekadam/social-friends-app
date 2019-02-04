import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import colors from '../styled/colors';

interface Props {
  dotSize?: number;
}

interface State {
  animation: any;
}

export default class Loader extends Component<Props, State> {
  render() {
    return <ActivityIndicator size="large" color={colors.facebook} />;
  }
}
