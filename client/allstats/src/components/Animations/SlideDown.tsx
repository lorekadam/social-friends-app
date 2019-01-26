import React, { Component } from 'react';
import { Animated } from 'react-native';

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
      <Animated.View
        style={{
          display: 'flex',
          width: '100%',
          position: 'absolute',
          zIndex: 2,
          left: 0,
          right: 0,
          overflow: 'hidden',
          backgroundColor: 'blue',
          top: this.props.top,
          height: fadeAnim
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
