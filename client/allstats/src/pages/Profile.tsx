import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Button } from '../styled/Buttons';
import { View } from '../styled/View';
import { Text } from '../styled/Text';
import colors from '../styled/colors';
import { NavigationScreenProp } from 'react-navigation';

interface State {
  navigation: NavigationScreenProp<any, any>;
}

export default class ProfilePage extends Component<{}, State> {
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
  };
  render() {
    return (
      <View>
        <Button
          title="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem('token');
            this.props.navigation.navigate('Login');
          }}
        >
          <Text color={colors.white}>Log out</Text>
        </Button>
      </View>
    );
  }
}
