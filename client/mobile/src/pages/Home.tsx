import React, { Component } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { Text } from '../styled/Text';
import PageSpine from './PageSpine';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

export default class HomePage extends Component<Props, {}> {
  render() {
    return (
      <PageSpine>
        <Text>Home Page</Text>
      </PageSpine>
    );
  }
}
