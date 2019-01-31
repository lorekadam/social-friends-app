import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styled/colors';
import { Image } from 'react-native';

interface State {
  width: number;
}

const AvatarWrapper = styled.View`
  height: 80%;
  background-color: ${colors.indigoWhite};
  border-radius: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export default class Avatar extends Component<{}, State> {
  state = {
    width: 0
  };
  render() {
    return (
      <AvatarWrapper
        onLayout={(e) => this.setState({ width: e.nativeEvent.layout.height })}
      >
        <Image
          source={{
            uri: `https://api.adorable.io/avatars/face/eyes3/nose7/mouth9/d8eee1`
          }}
          style={{ width: this.state.width, display: 'flex', flex: 1 }}
        />
      </AvatarWrapper>
    );
  }
}
