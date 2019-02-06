import React, { Component } from 'react';
import { Animated } from 'react-native';
import { width, height } from '../../styled/globals';
import colors from '../../styled/colors';

interface Props {
  open: boolean;
}

export default class Sidebar extends Component<Props, {}> {
  state = {
    slideInLeft: new Animated.Value(width * -0.8)
  };

  performSlide = () => {
    Animated.timing(this.state.slideInLeft, {
      toValue: this.props.open ? 0 : width * -0.8,
      duration: 300
    }).start();
  };

  componentDidMount = () => {
    this.performSlide();
  };

  componentDidUpdate = () => {
    this.performSlide();
  };

  render() {
    return (
      <Animated.ScrollView
        style={{
          position: 'absolute',
          top: 0,
          left: this.state.slideInLeft,
          backgroundColor: colors.dark2,
          width: width * 0.8,
          display: 'flex',
          height,
          flex: 1
        }}
      >
        {this.props.children}
      </Animated.ScrollView>
    );
  }
}
