import React, { Component } from 'react';
import { Text } from '../styled/Text';
import colors from '../styled/colors';
import { SimpleView } from '../styled/View';
import FindUsers from './FindUsers';
import { Button } from '../styled/Buttons';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import LogOutButton from './ControlButtons/LogOutButton';
import Loader from './Loader';
import { ME_QUERY } from '../pages/PageSpine';
import QLNotifications from './QLNotifications';
import { UserSearch } from '../QL/globals';
import { FindUser, User } from '../QL/types';

const UPDATE_USER_NAME = gql`
  mutation UPDATE_USER_NAME($name: String!) {
    updateUserName(name: $name) {
      message
    }
  }
`;

export const SEARCH_USER_NAMES = gql`
  query SEARCH_USER_NAMES($searchName: String!) {
    users(where: { name: $searchName }) {
      id
      name
    }
  }
`;

interface State {
  name: string;
  searched: boolean;
  searchResults: User[];
}

export default class FillUserName extends Component<{}, State> {
  state = {
    name: '',
    searched: false,
    searchResults: []
  };

  setResults = (res: UserSearch) => {
    const { data, searched, name } = res;
    this.setState({
      searched: searched ? searched : false,
      name: name ? name : '',
      searchResults: data.users ? data.users : []
    });
  };

  render() {
    const { name, searched, searchResults } = this.state;
    return (
      <SimpleView
        flex={1}
        align="center"
        justify="center"
        bgColor={colors.dark1}
      >
        <LogOutButton />
        <Text size={24} align="center" style={{ marginBottom: 15 }}>
          Hello!
        </Text>
        <Text size={18} align="center">
          Please fill up your name
        </Text>
        <FindUsers
          setResults={this.setResults}
          query={SEARCH_USER_NAMES}
          placeholder="Name..."
        />
        {searched &&
          (searchResults.length === 0 ? (
            <Mutation
              refetchQueries={[
                {
                  query: ME_QUERY
                }
              ]}
              mutation={UPDATE_USER_NAME}
              variables={{ name }}
            >
              {(updateUserName, { error, loading }) => {
                if (error) return <QLNotifications error={error} />;
                if (loading) return <Loader />;
                return (
                  <React.Fragment>
                    <Button
                      bgColor={colors.color1}
                      onPress={async () => {
                        await updateUserName();
                      }}
                    >
                      <Text>Save name!</Text>
                    </Button>
                  </React.Fragment>
                );
              }}
            </Mutation>
          ) : (
            <Text color={colors.error}>Given name is already taken</Text>
          ))}
      </SimpleView>
    );
  }
}
