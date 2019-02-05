import React, { Component } from 'react';
import { Animated } from 'react-native';

interface Props {
  duration?: number;
  toHeight: number;
  open: boolean;
}

export default class Accordion extends Component<Props, {}> {
  state = {
    dropAnim: new Animated.Value(0)
  };

  componentDidUpdate() {
    const { duration, toHeight, open } = this.props;
    Animated.timing(this.state.dropAnim, {
      toValue: open ? (toHeight === 0 ? 1000 : toHeight) : 0,
      duration: duration ? duration : 300
    }).start();
  }

  render() {
    const { dropAnim } = this.state;

    return (
      <Animated.View
        style={{
          zIndex: 2,
          left: 0,
          right: 0,
          height: dropAnim,
          width: '100%'
        }}
      >
        {this.props.open && this.props.children}
      </Animated.View>
    );
  }
}
