import React, { Component } from 'react';
import { Absolute } from '../../styled/Postions';
import CircleIconButton from '../display/CircleIconButton';
import colors from '../../styled/colors';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { CircleButton } from '../../styled/Buttons';
import { Text } from '../../styled/Text';

interface Props {
  path?: string;
  notifications: string;
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
        {this.props.notifications !== '0' && (
          <Absolute top={0} right={0}>
            <CircleButton
              size={16}
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Text size={10}>{this.props.notifications}</Text>
            </CircleButton>
          </Absolute>
        )}
      </Absolute>
    );
  }
}

export default withNavigation(SideMenuToggle);
