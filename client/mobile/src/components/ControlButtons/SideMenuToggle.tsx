import React, { Component } from 'react';
import { Absolute } from '../../styled/Postions';
import CircleIconButton from '../display/CircleIconButton';
import colors from '../../styled/colors';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

interface Props {
  path?: string;
  navigation: NavigationScreenProp<any, any>;
}

class SideMenuToggle extends Component<Props, {}> {
  render() {
    return (
      <Absolute top={10} right={10}>
        <CircleIconButton
          bgColor={'transparent'}
          color={colors.light2}
          action={() => this.props.navigation.openDrawer()}
          icon="settings"
        />
      </Absolute>
    );
  }
}

export default withNavigation(SideMenuToggle);
