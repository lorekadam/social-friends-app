import React, { Component } from 'react';
import { Image, StyleProp } from 'react-native';

interface Props {
  width?: number | string;
  height?: number | string;
  style?: StyleProp<any>;
}

export default class Logo extends Component<Props, {}> {
  render() {
    let { width, height } = this.props;
    width = width || 280;
    height = height || 280;
    return (
      <Image
        source={require('../../assets/logo2.png')}
        style={{ width, height }}
        resizeMode="contain"
      />
    );
  }
}
