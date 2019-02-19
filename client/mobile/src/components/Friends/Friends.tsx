import React, { Component } from 'react';
import FriendList from './FriendList';
import { Query } from 'react-apollo';
import { withNavigation, NavigationScreenProp } from 'react-navigation';
import Loader from '../Loader';
import Accordion from '../Animations/Accordion';
import {
  FRIEND_INVITE_PAGE,
  QRCODESCANNER_PAGE,
  FRIENDS_PAGE
} from '../../navigation/pageTypes';
import { Row } from '../../styled/Grid';
import CircleIconButton from '../display/CircleIconButton';
import colors from '../../styled/colors';
import { getRouteName } from '../../utils/getRouteName';
import QLNotifications from '../QLNotifications';
import { MY_FRIENDS_QUERY } from '../../QL/Queries';

interface Props {
  open: boolean;
  navigation: NavigationScreenProp<any, any>;
}

class Friends extends Component<Props, {}> {
  render() {
    const { open, navigation } = this.props;
    return (
      <Query query={MY_FRIENDS_QUERY} variables={{ last: 5 }}>
        {({ loading, data, error }) => {
          if (error) return <QLNotifications error={error} />;
          if (loading) return <Loader />;
          return (
            <Accordion open={open}>
              <Row
                justify="flex-end"
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
                  style={{ marginRight: 10 }}
                  icon="user-plus"
                  action={() => {
                    getRouteName(navigation.state) === FRIEND_INVITE_PAGE
                      ? navigation.closeDrawer()
                      : navigation.navigate(FRIEND_INVITE_PAGE);
                  }}
                />
                <CircleIconButton
                  bgColor={colors.color2}
                  style={{ marginRight: 10 }}
                  icon="maximize"
                  action={() => navigation.navigate(QRCODESCANNER_PAGE)}
                />
                <CircleIconButton
                  bgColor={colors.color1}
                  icon="list"
                  action={() => navigation.navigate(FRIENDS_PAGE)}
                />
              </Row>
              <FriendList friendships={data.friendships} />
            </Accordion>
          );
        }}
      </Query>
    );
  }
}

export default withNavigation(Friends);
