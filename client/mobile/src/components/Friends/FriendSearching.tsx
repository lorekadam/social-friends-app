import React, { Component } from 'react';
import { Mutation, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import debounce from 'lodash.debounce';
import { RoundedInput } from '../../styled/Input';
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
import { ScrollView } from 'react-native';

interface Props {
  navigation: NavigationScreenProp<any, any>;
  refetch: any;
}

interface State {
  success: string;
  searchResults: [];
  loading: boolean;
}

export const SEARCH_FRIENDS_QUERY = gql`
  query SEARCH_FRIENDS_QUERY($searchName: String!) {
    users(where: { name_contains: $searchName }) {
      id
      name
    }
  }
`;

export const INVITE_FRIEND_MUTATION = gql`
  mutation INVITE_FRIEND_MUTATION($name: String, $id: String) {
    inviteFriend(name: $name, id: $id) {
      message
    }
  }
`;

class FriendSearching extends Component<Props, State> {
  state = {
    success: '',
    searchResults: [],
    loading: false
  };

  handleChange = debounce(async (name: string, client: any) => {
    if (name.length >= 3) {
      console.log('searching...');
      this.setState({ loading: true });
      const res = await client.query({
        query: SEARCH_FRIENDS_QUERY,
        variables: {
          searchName: name
        }
      });
      this.setState({
        searchResults: res.data.users,
        loading: false
      });
    }
  }, 350);

  render() {
    const { success } = this.state;
    return (
      <Mutation mutation={INVITE_FRIEND_MUTATION} variables={this.state}>
        {(inviteFriend, { error, loading }) => {
          return (
            <FullView>
              {loading ? (
                <Loader />
              ) : (
                <React.Fragment>
                  <ApolloConsumer>
                    {(client) => (
                      <RoundedInput
                        onChangeText={(val: string) =>
                          this.handleChange(val, client)
                        }
                        placeholder="Search for friend..."
                        borderColor={colors.color1}
                      />
                    )}
                  </ApolloConsumer>
                  {this.state.searchResults.length > 0 && (
                    <ResultsWrapper>
                      {this.state.searchResults.map((user, i) => (
                        <Item topBorder={i === 0} key={user.id}>
                          <Text>{user.name}</Text>
                          <CircleIconButton
                            size={22}
                            buttonColor={colors.color2}
                            color={colors.light2}
                            icon="plus"
                            iconSize={16}
                            action={() => inviteFriend(user.id)}
                          />
                        </Item>
                      ))}
                    </ResultsWrapper>
                  )}
                  <QLNotifications error={error} success={success} />
                </React.Fragment>
              )}
            </FullView>
          );
        }}
      </Mutation>
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
