import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import BackButton from '../components/BackButton';
import { PROFILE_PAGE } from '../navigation/pageTypes';
import { MainView } from './PageSpine';

export default class QRCodeScanner extends React.Component {
  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const { hasCameraPermission } = this.state;
    console.log(hasCameraPermission);

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <MainView>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
        <BackButton path={PROFILE_PAGE} />
      </MainView>
    );
  }
}
