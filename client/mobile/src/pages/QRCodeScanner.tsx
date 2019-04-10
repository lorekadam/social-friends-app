import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { BarCodeScanner } from 'expo';
import BackButton from '../components/BackButton';
import { MainView } from './PageSpine';
import FriendInviteFromQR from '../components/Friends/FriendInviteFromQR';

export default class QRCodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    userId: '',
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, userId } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <MainView>
        <Camera
          style={{ flex: 1 }}
          type={this.state.type}
          onBarCodeScanned={e => {
            console.log('data', e.data);
            this.setState({ userId: e.data });
          }}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            {userId.length > 0 && <FriendInviteFromQR id={this.state.userId} />}
            <TouchableOpacity
              style={{
                flex: 0.1,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({
                  type:
                    this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                });
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                Flip
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        <BackButton />
      </MainView>
    );
  }
}
