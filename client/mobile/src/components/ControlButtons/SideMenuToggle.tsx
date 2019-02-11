import React, { Component } from 'react';
import { Absolute } from '../../styled/Postions';
import CircleIconButton from '../display/CircleIconButton';
import colors from '../../styled/colors';

interface Props {
  openDrawer: Function;
}

export default class SideMenuToggle extends Component<Props, {}> {
  render() {
    return (
      <Absolute top={10} right={10}>
        <CircleIconButton
          bgColor={'transparent'}
          color={colors.light2}
          action={() => this.props.openDrawer()}
          icon="settings"
        />
      </Absolute>
    );
  }
}
