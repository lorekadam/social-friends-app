import React, { Component } from 'react';
import CircleIconButton from '../display/CircleIconButton';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Row } from '../../styled/Grid';
import Loader from '../Loader';
import QLNotifications from '../QLNotifications';
import { Text } from '../../styled/Text';
import colors from '../../styled/colors';
import { PaddingView } from '../../styled/View';
import { Image } from 'react-native';
import { avatarUrl } from '../../config';
import { MY_FRIENDS_QUERY } from '../../QL/Queries';

interface Props {
  name: string;
  accepted: boolean;
  id: string;
}

const REMOVE_FRIEND_MUTATION = gql`
  mutation REMOVE_FRIEND_MUTATION($friendId: String!) {
    removeFriend(friendId: $friendId) {
      message
    }
  }
`;

export default class FriendListItem extends Component<Props, {}> {
  render() {
    const { name, accepted, id } = this.props;
    return (
      <Mutation
        refetchQueries={[
          {
            query: MY_FRIENDS_QUERY,
            variables: { last: 5 }
          }
        ]}
        mutation={REMOVE_FRIEND_MUTATION}
        variables={{ friendId: id }}
      >
        {(removeFriend, { error, loading }) => {
          if (error) return <QLNotifications error={error} />;
          if (loading) return <Loader />;
          return (
            <PaddingView padding={4}>
              <Row justify="space-between" align="center">
                <Image
                  source={{
                    uri: `${avatarUrl}${id}`
                  }}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30
                  }}
                />
                <Text>{name}</Text>
                <CircleIconButton
                  bgColor={colors.dark1}
                  size={24}
                  iconSize={14}
                  icon="minus"
                  action={async () => {
                    await removeFriend();
                  }}
                />
              </Row>
            </PaddingView>
          );
        }}
      </Mutation>
    );
  }
}
