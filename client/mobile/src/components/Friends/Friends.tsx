import React, { Component } from 'react';
import FriendList from './FriendList';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import Loader from '../Loader';
import Accordion from '../Animations/Accordion';
import {
  FRIEND_INVITE_PAGE,
  QRCODESCANNER_PAGE
} from '../../navigation/pageTypes';
import { Text } from '../../styled/Text';
import { Row } from '../../styled/Grid';
import CircleIconButton from '../display/CircleIconButton';
import colors from '../../styled/colors';
import { getRouteName } from '../../utils/getRouteName';

interface Props {
  open: boolean;
  navigation: NavigationScreenProp<any, any>;
}

export const MY_FRIENDS_QUERY = gql`
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
    const { open, navigation } = this.props;
    return (
      <Query query={MY_FRIENDS_QUERY}>
        {({ loading, data }) => {
          return (
            <Accordion open={open}>
              {loading ? (
                <Loader />
              ) : (
                <React.Fragment>
                  <Row
                    justify="space-between"
                    align="center"
                    style={{
                      marginBottom: 15,
                      paddingBottom: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: `${colors.light1}`
                    }}
                  >
                    <CircleIconButton
                      bgColor={colors.color1}
                      icon="user-plus"
                      action={() => {
                        getRouteName(navigation.state) === FRIEND_INVITE_PAGE
                          ? navigation.closeDrawer()
                          : navigation.navigate(FRIEND_INVITE_PAGE);
                      }}
                    >
                      <Text>Invite friends!</Text>
                    </CircleIconButton>
                    <Text>{`Friends: ${data.friendships.length}`}</Text>
                    <CircleIconButton
                      bgColor={colors.color2}
                      icon="maximize"
                      action={() => navigation.navigate(QRCODESCANNER_PAGE)}
                    >
                      <Text>Scan QR</Text>
                    </CircleIconButton>
                  </Row>

                  <FriendList friendships={data.friendships} />
                </React.Fragment>
              )}
            </Accordion>
          );
        }}
      </Query>
    );
  }
}

export default withNavigation(Friends);
