import React, { Component } from 'react';
import styled from 'styled-components';
import { Constants } from 'expo';
import { PaddingView } from '../styled/View';
import ColorizedTop from '../components/ColorizedTop';
import CenteredTop from '../components/CenteredTop';

interface Props {
  name: string;
}

const MainView = styled.View`
  position: relative;
  margin-top: ${Constants.statusBarHeight};
  flex: 1;
  height: 100%;
  flex-direction: column;
`;

export default class PageSpine extends Component<Props, {}> {
  render() {
    return (
      <MainView>
        <ColorizedTop height="13%" />
        <CenteredTop />
        <PaddingView height="87%">{this.props.children}</PaddingView>
      </MainView>
    );
  }
}
