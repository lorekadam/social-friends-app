import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
// import Animated, { Easing } from 'react-native-reanimated';
// import styled from 'styled-components';
import colors from '../styled/colors';

// const {
//   set,
//   cond,
//   startClock,
//   stopClock,
//   clockRunning,
//   block,
//   timing,
//   debug,
//   Value,
//   Clock,
//   divide,
//   concat
// } = Animated;

// function runTiming(clock, value, dest) {
//   const state = {
//     finished: new Value(0),
//     position: new Value(0),
//     time: new Value(0),
//     frameTime: new Value(0)
//   };

//   const config = {
//     duration: 1000,
//     toValue: new Value(0),
//     easing: Easing.inOut(Easing.ease)
//   };

//   function resetAnimation(from, to) {
//     return [
//       set(state.finished, 0),
//       set(state.time, 0),
//       set(state.position, from),
//       set(state.frameTime, 0),
//       set(config.toValue, to),
//       startClock(clock)
//     ];
//   }

//   return block([
//     cond(clockRunning(clock), 0, resetAnimation(value, dest)),
//     timing(clock, state, config),
//     cond(
//       state.finished,
//       debug(`stop clock ${state.finished}`, stopClock(clock))
//     ),
//     state.position
//   ]);
// }

interface Props {
  dotSize?: number;
}

interface State {
  animation: any;
}

// const StyledLoader = styled.View`
//   display: flex;
//   justify-content: center;
//   flex-direction: row;
// `;

// const Dot = styled.View`
//   width: ${(props: Props) => (props.dotSize ? props.dotSize : 20)};
//   height: ${(props: Props) => (props.dotSize ? props.dotSize : 20)};
//   background-color: ${colors.white};
//   border-radius: ${(props: Props) => (props.dotSize ? props.dotSize : 20)};
//   margin: 0 2px;
// `;

export default class Loader extends Component<Props, State> {
  // constructor(props: Props) {
  //   super(props);
  //   this.dot1 = runTiming(new Clock(), 0, 1.05);
  //   this.dot2 = runTiming(new Clock(), 0, 1.05);
  //   this.dot3 = runTiming(new Clock(), 0, 1.05);
  // }

  render() {
    // const { dotSize } = this.props;
    return (
      // <StyledLoader>
      //   <Animated.View style={{ transform: [{ scale: this.dot1 }] }}>
      //     <Dot dotSize={dotSize} />
      //   </Animated.View>
      //   <Animated.View style={{ transform: [{ scale: this.dot2 }] }}>
      //   <Dot dotSize={dotSize} />
      //   </Animated.View>
      //   <Animated.View style={{ transform: [{ scale: this.dot3 }] }}>
      //   <Dot dotSize={dotSize} />
      //   </Animated.View>
      // </StyledLoader>
      <ActivityIndicator size="large" color={colors.pink} />
    );
  }
}
