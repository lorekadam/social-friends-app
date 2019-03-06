import React, { Component } from 'react';
import { Absolute } from '../../styled/Postions';
import CircleIconButton from '../display/CircleIconButton';
import colors from '../../styled/colors';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { CircleButton } from '../../styled/Buttons';
import { Text } from '../../styled/Text';

interface Props {
  path?: string;
  notifications: number;
  navigation: NavigationScreenProp<any, any>;
}

class SideMenuToggle extends Component<Props, {}> {
  render() {
    const { navigation, notifications } = this.props;
    return (
      <Absolute top={10} right={10}>
        <CircleIconButton
          bgColor={'transparent'}
          color={colors.light2}
          action={() => navigation.openDrawer()}
          icon="settings"
        />
        {notifications > 0 && (
          <Absolute top={0} right={0}>
            <CircleButton size={16} onPress={() => navigation.openDrawer()}>
              <Text size={10}>{notifications > 99 ? 99 : notifications}</Text>
            </CircleButton>
          </Absolute>
        )}
      </Absolute>
    );
  }
}

export default withNavigation(SideMenuToggle);
