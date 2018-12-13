import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Button } from '../styled/Buttons';

export default class ProfilePage extends Component {
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
        />
        <Button
          title="Test query hot"
          onPress={async () => {
            await AsyncStorage.removeItem('token');
            this.props.navigation.navigate('Login');
          }}
        />
      </View>
    );
  }
}
