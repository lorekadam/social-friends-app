import React, { Component } from 'react';
import { CircleButton } from '../styled/Buttons';
import { Ionicons } from '@expo/vector-icons';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

interface Props {
  path?: string;
  navigation: NavigationScreenProp<any, any>;
}

class BackButton extends Component<Props, {}> {
  render() {
    const { navigation, path } = this.props;
    return (
      <CircleButton
        style={{ position: 'absolute', top: 10, left: 10 }}
        onPress={() =>
          path ? navigation.navigate(path) : navigation.goBack(null)
        }
      >
        <Ionicons name="md-arrow-back" size={28} color="white" />
      </CircleButton>
    );
  }
}

export default withNavigation(BackButton);
