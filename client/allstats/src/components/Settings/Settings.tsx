import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationScreenProp, withNavigation } from 'react-navigation';
import styled from 'styled-components';

import { LOGIN_PAGE } from '../../navigation/pageTypes';
import CircleIconButton from '../display/CircleIconButton';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const SettingsSection = styled.View`
  background-color: #abb908;
  display: flex;
  align-items: flex-end;
  padding: 10px;
  overflow: hidden;
`;

class Settings extends Component<Props, {}> {
  render() {
    return (
      <SettingsSection>
        <CircleIconButton
          action={async () => {
            await AsyncStorage.removeItem('token');
            this.props.navigation.navigate(LOGIN_PAGE);
          }}
          icon="log-out"
        />
      </SettingsSection>
    );
  }
}

export default withNavigation(Settings);
