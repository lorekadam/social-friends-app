import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import QRCode from 'react-native-qrcode';
import { NavigationScreenProp, withNavigation } from 'react-navigation';

import { LOGIN_PAGE } from '../../navigation/pageTypes';
import { RowColumn, ColColumn } from '../../styled/Grid';
import CircleIconButton from '../display/CircleIconButton';
import { Text } from '../../styled/Text';

interface Props {
  id: string;
  navigation: NavigationScreenProp<any, any>;
}

class Settings extends Component<Props, {}> {
  render() {
    return (
      <RowColumn>
        <ColColumn justify="flex-end">
          <CircleIconButton
            action={async () => {
              await AsyncStorage.removeItem('token');
              this.props.navigation.navigate(LOGIN_PAGE);
            }}
            icon="log-out"
          />
        </ColColumn>
        <ColColumn justify="center">
          <Text>Your QR code!</Text>
        </ColColumn>
        <ColColumn justify="center">
          <View style={{ overflow: 'hidden' }}>
            <QRCode value={this.props.id} />
          </View>
        </ColColumn>
      </RowColumn>
    );
  }
}

export default withNavigation(Settings);
