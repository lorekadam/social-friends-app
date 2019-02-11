import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import colors from '../../styled/colors';
import { FullView } from '../../styled/View';
import { Button } from '../../styled/Buttons';
import { Row, Col } from '../../styled/Grid';
import { nameValidation } from '../../utils/validations';
import QLNotifications from '../QLNotifications';
import Loader from '../Loader';
import { QRCODESCANNER_PAGE } from '../../navigation/pageTypes';
import { Text } from '../../styled/Text';
import { Item, ResultsWrapper } from '../../styled/Autocomplete';
import CircleIconButton from '../display/CircleIconButton';
import { ScrollView, Image } from 'react-native';
import FindUsers from '../FindUsers';
import { UserSearch } from '../../types/globals';
import { avatarUrl } from '../../config';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  success: string;
  searchResults: any[];
  loading: boolean;
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

class FriendSearching extends Component<Props, State> {
  state = {
    success: '',
    searchResults: [],
    searched: false
  };

  setResults = (res: {}) => {
    const { data } = res;
    this.setState({ searchResults: data.friendsToInvite });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <FullView>
        <React.Fragment>
          <FindUsers
            placeholder="Search..."
            query={SEARCH_FRIENDS_QUERY}
            setResults={this.setResults}
          />
          {searchResults.length > 0 && (
            <ResultsWrapper>
              {searchResults.map((user, i) => (
                <Mutation
                  key={user.id}
                  mutation={INVITE_FRIEND_MUTATION}
                  variables={{ id: user.id }}
                >
                  {(inviteFriend, { error, loading }) => {
                    return (
                      <Item topBorder={i === 0}>
                        {loading ? (
                          <Loader />
                        ) : (
                          <React.Fragment>
                            <Image
                              source={{
                                uri: `${avatarUrl}${user.id}`
                              }}
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 40
                              }}
                            />
                            <Text>{user.name}</Text>
                            <CircleIconButton
                              size={22}
                              buttonColor={colors.color2}
                              color={colors.light2}
                              icon="plus"
                              iconSize={16}
                              action={() => inviteFriend()}
                            />
                          </React.Fragment>
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

export default withNavigation(FriendSearching);

{
  /* <Button
disabled={!nameValidation(name)}
onPress={async () => {
  const res = await inviteFriend();
  if (res) {
    this.setState({
      success: res.data.inviteFriend.message
    });
  }
  this.props.refetch();
}}
>
<Text>Send!</Text>
</Button>

<Button
onPress={() =>
  this.props.navigation.navigate(QRCODESCANNER_PAGE)
}
>
<Text>Scan QR</Text>
</Button> */
}
