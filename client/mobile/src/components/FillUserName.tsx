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

const UPDATE_USER_NAME = gql`
  mutation UPDATE_USER_NAME($name: String!) {
    updateUserName(name: $name) {
      message
    }
  }
`;

interface State {
  name: string;
  searched: boolean;
  searchResults: any[];
}

export default class FillUserName extends Component<Props, State> {
  state = {
    name: '',
    searched: false,
    searchResults: []
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
          setResults={(results: State) => this.setState(results)}
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