import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from '../styled/Buttons';
import { View } from '../styled/View';
import { Text } from '../styled/Text';
import colors from '../styled/colors';

interface State {
  navigation: NavigationScreenProp<any, any>;
}

export const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

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
      <Mutation mutation={TOGGLE_CART_MUTATION}>
        {(toggleCart) => (
          <Query query={LOCAL_STATE_QUERY}>
            {({ data }) => {
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
                  <Button title="Toggle cart" onPress={() => toggleCart()}>
                    <Text color={colors.white}>Test local state change!</Text>
                  </Button>
                  {data.cartOpen ? <Text>Opened</Text> : <Text>Closed</Text>}
                </View>
              );
            }}
          </Query>
        )}
      </Mutation>
    );
  }
}
