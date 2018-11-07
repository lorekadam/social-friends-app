import React, { Component } from 'react';
import { Button, View } from 'react-native';
import { Input } from '../styled/Input';

export default class LoginPage extends Component {
  render() {
    return (
      <View>
        <Button
          title="Go to login page"
          onPress={() => this.props.navigation.navigate('Register')}
        />
        <Input placeholder="Email..." />
        <Input placeholder="Password..." />
      </View>
    );
  }
}
