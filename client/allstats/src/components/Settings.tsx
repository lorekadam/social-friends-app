import React, { Component } from 'react';
import { Button } from '../styled/Buttons';
import { AsyncStorage } from 'react-native';
import { Text } from '../styled/Text';
import colors from '../styled/colors';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class Settings extends Component<Props, {}> {
  render() {
    return (
      <Button
        onPress={async () => {
          await AsyncStorage.removeItem('token');
          this.props.navigation.navigate('Login');
        }}
      >
        <Text color={colors.white}>Log out</Text>
      </Button>
    );
  }
}
