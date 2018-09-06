import React from 'react';
import { List, Body, ListItem, Left, Thumbnail, Text, Right, View } from 'native-base';

export default class FriendsList extends React.Component {
  showFriendProfile = (id) => {
    console.log(id);
  };
  render() {
    const { friends } = this.props;
    return (
      <View>
        <List>
          {friends.map((friend, key) => (
            <ListItem key={key} avatar onPress={this.showFriendProfile}>
              <Left>
                <Thumbnail source={{ uri: 'http://i.pravatar.cc/50?img=15' }} />
              </Left>
              <Body>
                <Text>{friend.friendName}</Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </View>
    );
  }
}
