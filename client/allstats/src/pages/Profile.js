import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Button } from '../styled/Button';

export default class ProfilePage extends Component {
  render() {
    return (
      <View>
        <Button
          title="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem('token');
            this.props.navigation.navigate('Login');
          }}
        />
      </View>
    );
  }
}
