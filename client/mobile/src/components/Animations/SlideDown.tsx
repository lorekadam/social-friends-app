import React, { Component } from 'react';
import { Animated, Text } from 'react-native';
import { PaddingView } from '../../styled/View';
import colors from '../../styled/colors';

interface Props {
  top: number;
  duration?: number;
  toHeight?: number;
}

export default class SlideDown extends Component<Props, {}> {
  state = {
    fadeAnim: new Animated.Value(0)
  };

  componentDidMount() {
    const { duration, toHeight } = this.props;
    Animated.timing(this.state.fadeAnim, {
      toValue: toHeight ? toHeight : 240,
      duration: duration ? duration : 300
    }).start();
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.ScrollView
        style={{
          display: 'flex',
          position: 'absolute',
          zIndex: 2,
          left: 0,
          right: 0,
          backgroundColor: colors.secondary,
          top: this.props.top,
          height: fadeAnim
        }}
      >
        <PaddingView padding={5}>{this.props.children}</PaddingView>
      </Animated.ScrollView>
    );
  }
}
