import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styled/colors';
import { Image } from 'react-native';
import { avatarDimension } from '../styled/globals';

const AvatarWrapper = styled.View`
  width: ${avatarDimension}px;
  height: ${avatarDimension}px;
  background-color: ${colors.pink};
  border-radius: ${avatarDimension / 2}px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 4px solid ${colors.pink};
`;

export default class Avatar extends Component {
  render() {
    return (
      <AvatarWrapper>
        <Image
          source={{
            uri: 'https://api.adorable.io/avatars/200/adam@adorable.io.png'
          }}
          style={{ height: avatarDimension, width: avatarDimension }}
        />
      </AvatarWrapper>
    );
  }
}
