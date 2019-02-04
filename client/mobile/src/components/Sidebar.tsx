import React, { Component } from 'react';
import { Animated } from 'react-native';
import { width } from '../styled/globals';
import colors from '../styled/colors';

interface Props {
  open: boolean;
}

export default class Sidebar extends Component<Props, {}> {
  state = {
    slideInLeft: new Animated.Value(0)
  };

  componentDidUpdate = () => {
    Animated.timing(this.state.slideInLeft, {
      toValue: this.props.open ? width * -0.8 : 0,
      duration: 300
    }).start();
  };

  render() {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: this.state.slideInLeft,
          backgroundColor: colors.seaMist,
          width: width * 0.8
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
