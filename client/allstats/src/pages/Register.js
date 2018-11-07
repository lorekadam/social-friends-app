import React, { Component } from 'react';
import { Button, View } from 'react-native';

export default class RegisterPage extends Component {
  render() {
    return (
      <View>
        <Button
          title="Go to register page"
          onPress={() => this.props.navigation.navigate('Login')}
        />
      </View>
    );
  }
}
