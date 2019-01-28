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
    width = width ? width : 280;
    height = height ? height : 280;
    return (
      <Image
        source={require('../../assets/logo1.png')}
        style={{ width, height }}
        resizeMode={'contain'}
      />
    );
  }
}
