import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import BackButton from '../components/BackButton';
import { PROFILE_PAGE } from '../navigation/pageTypes';
import { MainView } from './PageSpine';
import { BarCodeScanner } from 'expo';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import Loader from '../components/Loader';
import { Button } from '../styled/Buttons';
import { INVITE_FRIEND_MUTATION } from '../components/Friends/FriendInvitation';
import { withNavigation } from 'react-navigation';

const USER_QUERY = gql`
  query USER_QUERY($id: String!) {
    user(id: $id) {
      id
      name
    }
  }
`;

class QRCodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    userId: ''
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, userId } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <MainView>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            onBarCodeScanned={(e) => this.setState({ userId: e.data })}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row'
              }}
            >
              {userId.length > 0 && (
                <Query query={USER_QUERY} variables={{ id: this.state.userId }}>
                  {({ data, loading }) => {
                    if (loading) {
                      return <Loader />;
                    }
                    return (
                      <View
                        style={{
                          position: 'absolute',
                          top: '30%',
                          left: '30%',
                          padding: 20
                        }}
                      >
                        <Mutation mutation={INVITE_FRIEND_MUTATION}>
                          {(inviteFriend, { error, loading }) => (
                            <Button
                              onPress={async () => {
                                const res = await inviteFriend();
                                if (res) {
                                  this.props.navigation.navigate(PROFILE_PAGE);
                                }
                              }}
                            >
                              {loading ? (
                                <Loader />
                              ) : (
                                <Text>Send invitation to {data.user.name}</Text>
                              )}
                            </Button>
                          )}
                        </Mutation>
                        <Button onPress={() => this.setState({ userId: '' })}>
                          <Text>Close</Text>
                        </Button>
                      </View>
                    );
                  }}
                </Query>
              )}
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center'
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                  });
                }}
              >
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                >
                  Flip
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <BackButton path={PROFILE_PAGE} />
        </MainView>
      );
    }
  }
}

export default withNavigation(QRCodeScanner);
