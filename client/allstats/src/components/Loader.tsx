import React, { Component } from 'react';
import styled from 'styled-components';
import { View } from 'react-native';
import colors from '../styled/colors';

interface Props {
  dotSize: number;
}

const StyledLoader = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const Dot = styled.View`
  width: ${(props: Props) => (props.dotSize ? props.dotSize : 20)};
  height: ${(props: Props) => (props.dotSize ? props.dotSize : 20)};
  background-color: ${colors.white};
  border-radius: ${(props: Props) => (props.dotSize ? props.dotSize : 20)};
  margin: 0 2px;
`;

export default class Loader extends Component<Props, {}> {
  render() {
    const { dotSize } = this.props;
    return (
      <View>
        <StyledLoader>
          <Dot dotSize={dotSize} />
          <Dot dotSize={dotSize} />
          <Dot dotSize={dotSize} />
        </StyledLoader>
      </View>
    );
  }
}
