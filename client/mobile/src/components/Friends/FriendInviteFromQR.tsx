import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Query, Mutation } from 'react-apollo';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

import Loader from '../Loader';
import { Button } from '../../styled/Buttons';
import { INVITE_FRIEND_MUTATION } from './FriendSearching';
import { USER_QUERY } from '../../QL/Queries';
import { HOME_PAGE } from '../../navigation/pageTypes';
import QLNotifications from '../QLNotifications';

interface Props {
  id: string;
  navigation: NavigationScreenProp<any, any>;
}

class FriendInviteFromQR extends Component<Props, {}> {
  render() {
    return (
      <Query query={USER_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) {
            return <Loader />;
          }
          return (
            <View
              style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '80%',
                padding: 20
              }}
            >
              <Mutation
                mutation={INVITE_FRIEND_MUTATION}
                variables={{ id: this.props.id }}
              >
                {(inviteFriend, { error, loading }) => (
                  <React.Fragment>
                    <Button
                      onPress={async () => {
                        const res = await inviteFriend();
                        if (res) {
                          this.props.navigation.navigate(HOME_PAGE);
                        }
                      }}
                    >
                      {loading ? (
                        <Loader />
                      ) : (
                        <Text>Send invitation to {data.user.name}</Text>
                      )}
                    </Button>
                    <QLNotifications error={error} />
                  </React.Fragment>
                )}
              </Mutation>
              <Button onPress={() => this.setState({ userId: '' })}>
                <Text>Close</Text>
              </Button>
            </View>
          );
        }}
      </Query>
    );
  }
}

export default withNavigation(FriendInviteFromQR);
