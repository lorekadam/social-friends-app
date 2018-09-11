import React from 'react';
import { List, Body, ListItem, Left, Thumbnail, Text, View, Button } from 'native-base';

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
            <ListItem key={key} avatar onPress={() => this.showFriendProfile(friend._id)}>
              <Left>
                <Thumbnail source={{ uri: `http://i.pravatar.cc/50?img=${key}` }} />
              </Left>
              <Body>
                <Text>{friend.friendName}</Text>
                <Button>
                  <Text>DUEL!</Text>
                </Button>
                <Text note>{!friend.accepted && 'Waitting for accept'}</Text>
              </Body>
            </ListItem>
          ))}
        </List>
      </View>
    );
  }
}
