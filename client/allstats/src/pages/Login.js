import React, { Component } from 'react';
import { View } from 'react-native';
import { Input } from '../styled/Input';
import { Button } from '../styled/Button';

// <Button
//   title="Go to register page"
//   onPress={() => this.props.navigation.navigate('Register')}
// />

export default class LoginPage extends Component {
  render() {
    return (
      <View>
        <Button
          title="Register page"
          onPress={() => this.props.navigation.navigate('Register')}
        />
        <Input placeholder="Email..." />
        <Input placeholder="Password..." />
        <Button title="Login" onPress={() => console.log('test')} />
      </View>
    );
  }
}
