import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from '../styled/Buttons';
import { View } from '../styled/View';
import { Text } from '../styled/Text';
import colors from '../styled/colors';

interface State {
  navigation: NavigationScreenProp<any, any>;
}

const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
    }
  }
`;

export default class ProfilePage extends Component<{}, State> {
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
  };
  render() {
    return (
      <Query query={ME_QUERY}>
        {({ loading, error, data }) => {
          return (
            <View>
              {console.log(data)}
              <Button
                title="Logout"
                onPress={async () => {
                  await AsyncStorage.removeItem('token');
                  this.props.navigation.navigate('Login');
                }}
              >
                <Text color={colors.white}>Log out</Text>
              </Button>
              <Button
                title="Logout"
                onPress={async () => {
                  await AsyncStorage.removeItem('token');
                  this.props.navigation.navigate('Login');
                }}
              >
                <Text color={colors.white}>Test Query!</Text>
              </Button>
            </View>
          );
        }}
      </Query>
    );
  }
}
