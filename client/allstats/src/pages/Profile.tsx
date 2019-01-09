import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from '../styled/Buttons';
import { Text } from '../styled/Text';
import colors from '../styled/colors';
import PageSpine from './PageSpine';

interface Props {
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
      email
    }
  }
`;

export default class ProfilePage extends Component<Props, {}> {
  render() {
    return (
      <Mutation mutation={TOGGLE_CART_MUTATION}>
        {(toggleCart) => (
          <Query query={ME_QUERY}>
            {({ data }) => {
              console.log(data);
              return (
                <PageSpine name={data.me ? data.me.name : ''}>
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
                  <Query query={LOCAL_STATE_QUERY}>
                    {({ data }) => {
                      return <Text>{data.cartOpen ? 'Opened' : 'Closed'}</Text>;
                    }}
                  </Query>
                </PageSpine>
              );
            }}
          </Query>
        )}
      </Mutation>
    );
  }
}
