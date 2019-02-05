import React, { Component } from 'react';
// import { LinearGradient } from 'expo';
import { View } from 'react-native';
import styled from 'styled-components';
import colors from '../styled/colors';
// import { ArrayTwoOrMore } from '../types/globals';

const Line = styled.View`
  height: 4px;
  position: relative;
  display: flex;
  background-color: ${colors.pink};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// const r: number = Math.floor(Math.random() * 255) + 1;
// const g: number = Math.floor(Math.random() * 255) + 1;
// const b: number = Math.floor(Math.random() * 255) + 1;

// const colors: ArrayTwoOrMore<string> = [
//   `rgb(${r}, ${g}, ${b})`,
//   `rgb(${Math.floor(r * 0.7)}, ${Math.floor(g * 0.7)}, ${Math.floor(
//     b * 0.7
//   )})`
// ];

export default class ColorizedTop extends Component {
  render() {
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: `${colors.dark1}`
        }}
      >
        {this.props.children}
      </View>
    );
  }
}

{
  /* <LinearGradient
  colors={colors}
  style={{
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }}
>
  {this.props.children}
</LinearGradient> */
}
