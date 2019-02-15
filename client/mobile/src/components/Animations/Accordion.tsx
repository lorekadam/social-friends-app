import React, { Component } from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';
import { AbsoluteFlex } from '../../styled/Postions';
import { PaddingView } from '../../styled/View';

interface Props {
  open: boolean;
  padding?: number;
}

export default class Accordion extends Component<Props, {}> {
  state = {
    toHeight: 0,
    dropAnim: new Animated.Value(0),
    opacity: new Animated.Value(0)
  };

  componentDidUpdate() {
    const { open } = this.props;
    Animated.parallel([
      Animated.spring(this.state.dropAnim, {
        toValue: open ? this.state.toHeight : 0
      }),
      Animated.timing(this.state.opacity, {
        toValue: open ? 1 : 0,
        duration: 300
      })
    ]).start();
  }

  render() {
    const { dropAnim, opacity } = this.state;
    const { padding } = this.props;
    return (
      <Animated.View
        style={{
          zIndex: 2,
          left: 0,
          right: 0,
          height: dropAnim,
          opacity,
          width: '100%'
        }}
      >
        {this.props.open && (
          <AbsoluteFlex
            right={0}
            left={0}
            onLayout={(e: LayoutChangeEvent) => {
              this.setState({ toHeight: e.nativeEvent.layout.height });
            }}
          >
            <PaddingView padding={padding ? padding : 15}>
              {this.props.children}
            </PaddingView>
          </AbsoluteFlex>
        )}
      </Animated.View>
    );
  }
}
