import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import { Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../../styled/colors';
import { FullView } from '../../styled/View';
import QLNotifications from '../QLNotifications';
import Loader from '../Loader';
import { Text } from '../../styled/Text';
import { Item, ResultsWrapper } from '../../styled/Autocomplete';
import CircleIconButton from '../display/CircleIconButton';
import { UserSearch, UserToInvite } from '../../QL/globals';
import { avatarUrl } from '../../config';
import { FindUser } from '../../QL/types';
import FindUsers from '../FindUsers';
import { MY_FRIENDS_QUERY } from '../../QL/Queries';
import { ColColumn } from '../../styled/Grid';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  success: string;
  searchResults: FindUser[];
  searched: boolean;
}

export const INVITE_FRIEND_MUTATION = gql`
  mutation INVITE_FRIEND_MUTATION($name: String, $id: String) {
    inviteFriend(name: $name, id: $id) {
      message
    }
  }
`;

export const SEARCH_FRIENDS_QUERY = gql`
  query SEARCH_FRIENDS_QUERY($searchName: String!) {
    friendsToInvite(where: { name_contains: $searchName }) {
      id
      name
    }
  }
`;

class FriendSearch extends Component<Props, State> {
  state = {
    success: '',
    searchResults: [],
    searched: false,
  };

  setResults = (res: UserSearch) => {
    const { data } = res;
    this.setState({
      searchResults: data.friendsToInvite ? data.friendsToInvite : [],
    });
  };

  setFriendAsInvited = (i: number) => {
    const { searchResults } = this.state;
    searchResults[i].invited = true;
    this.setState({
      searchResults,
    });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <FullView>
        <React.Fragment>
          <ColColumn>
            <FindUsers
              placeholder="Search..."
              query={SEARCH_FRIENDS_QUERY}
              setResults={this.setResults}
            />
          </ColColumn>
          {searchResults.length > 0 && (
            <ResultsWrapper>
              {searchResults.map((user: UserToInvite, i) => (
                <Mutation
                  key={user.id}
                  mutation={INVITE_FRIEND_MUTATION}
                  refetchQueries={[
                    {
                      query: MY_FRIENDS_QUERY,
                      variables: { last: 5 },
                    },
                  ]}
                  variables={{ id: user.id }}
                >
                  {(inviteFriend, { error, loading }) => {
                    if (error) return <QLNotifications error={error} />;
                    if (loading) return <Loader />;
                    return (
                      <Item>
                        <Image
                          source={{
                            uri: `${avatarUrl}${user.id}`,
                          }}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40,
                          }}
                        />
                        <Text>{user.name}</Text>
                        {user.invited ? (
                          <Feather name="check-circle" />
                        ) : (
                          <CircleIconButton
                            size={22}
                            bgColor={colors.color2}
                            color={colors.light2}
                            icon="plus"
                            iconSize={16}
                            action={async () => {
                              const res = await inviteFriend();
                              if (res) {
                                this.setFriendAsInvited(i);
                              }
                            }}
                          />
                        )}
                      </Item>
                    );
                  }}
                </Mutation>
              ))}
            </ResultsWrapper>
          )}
        </React.Fragment>
      </FullView>
    );
  }
}

export default withNavigation(FriendSearch);
