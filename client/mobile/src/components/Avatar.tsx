import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import { LayoutEvent } from 'react-navigation';
import colors from '../styled/colors';
import { avatarUrl } from '../config';

interface Props {
  userId: string;
}

interface State {
  width: number;
}

const AvatarWrapper = styled.View`
  height: 60%;
  background-color: ${colors.light2};
  border-radius: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export default class Avatar extends Component<Props, State> {
  state = {
    width: 0,
  };

  render() {
    return (
      <AvatarWrapper
        onLayout={(e: LayoutEvent) =>
          this.setState({ width: e.nativeEvent.layout.height })
        }
      >
        <Image
          source={{
            uri: `${avatarUrl}${this.props.userId}`,
          }}
          style={{ width: this.state.width, display: 'flex', flex: 1 }}
        />
      </AvatarWrapper>
    );
  }
}
