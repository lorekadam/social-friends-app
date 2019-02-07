import React, { Component } from 'react';
import FriendList from './FriendList';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import Loader from '../Loader';
import Accordion from '../Animations/Accordion';
import { Button } from '../../styled/Buttons';
import { FRIEND_INVITE_PAGE } from '../../navigation/pageTypes';
import { Text } from '../../styled/Text';

interface Props {
  open: boolean;
  closeDrawer: Function;
  navigation: NavigationScreenProp<any, any>;
}

const MY_FRIENDS_QUERY = gql`
  query MY_FRIENDS_QUERY {
    friendships {
      accepted
      friend {
        id
        name
      }
    }
  }
`;

class Friends extends Component<Props, {}> {
  render() {
    const { open, navigation, closeDrawer } = this.props;
    return (
      <Query query={MY_FRIENDS_QUERY}>
        {({ loading, data, refetch }) => {
          return (
            <Accordion open={open}>
              <Button
                onPress={() =>
                  navigation.state.key === FRIEND_INVITE_PAGE
                    ? closeDrawer()
                    : navigation.navigate(FRIEND_INVITE_PAGE)
                }
              >
                <Text>Invite friends!</Text>
              </Button>
              {loading ? (
                <Loader />
              ) : (
                <FriendList friendships={data.friendships} refetch={refetch} />
              )}
            </Accordion>
          );
        }}
      </Query>
    );
  }
}

export default withNavigation(Friends);
