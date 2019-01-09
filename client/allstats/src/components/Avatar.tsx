import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../styled/colors';
import { Image } from 'react-native';

const AvatarWrapper = styled.View`
  width: 120px;
  height: 120px;
  background-color: ${colors.pink};
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 5px solid ${colors.pink};
`;

export default class Avatar extends Component {
  render() {
    return (
      <AvatarWrapper>
        <Image
          source={{
            uri: 'https://api.adorable.io/avatars/200/adam@adorable.io.png'
          }}
          style={{ height: 120, width: 120 }}
        />
      </AvatarWrapper>
    );
  }
}
