import React from 'react';
import { connect } from 'react-redux';

import { Constants, Camera, FileSystem, Permissions } from 'expo';
import { StyleSheet, Text, View, TouchableOpacity, Slider } from 'react-native';

import { navChange } from '../actions/navigationActions';
import * as types from '../actions/types';


const landmarkSize = 2;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off'
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto'
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  navigation: {
    flex: 1
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flipText: {
    color: 'white',
    fontSize: 15
  },
  item: {
    margin: 4,
    backgroundColor: 'indianred',
    height: 35,
    width: 80,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  picButton: {
    backgroundColor: 'darkseagreen'
  },
  galleryButton: {
    backgroundColor: 'indianred'
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red'
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent'
  },
  row: {
    flexDirection: 'row'
  }
});

@connect()
export default class CameraScreen extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    showGallery: false,
    faces: [],
    permissionsGranted: false
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}photos`).catch((e) => {
      console.log(e, 'Directory exists');
    });
  }

  onFacesDetected = ({ faces }) => this.setState({ faces });
  onFaceDetectionError = state => console.warn('Faces detection error:', state);

  getRatios = async () => {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  setFocusDepth = (depth) => {
    this.setState({
      depth
    });
  };

  setRatio = (ratio) => {
    this.setState({
      ratio
    });
  };

  toggleFacing = () => {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back'
    });
  };

  toggleFlash = () => {
    this.setState({
      flash: flashModeOrder[this.state.flash]
    });
  };

  toggleWB = () => {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance]
    });
  };

  toggleFocus = () => {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on'
    });
  };

  zoomOut = () => {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1
    });
  };

  zoomIn = () => {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1
    });
  };

  takePicture = () => {
    if (this.camera) {
      const tessOptions = {
        whitelist: null,
        blacklist: '\'!"#$%&/()={}[]+*-_:;<>'
      };
      const lang = 'LANG_ENGLISH';

      this.camera.takePictureAsync().then((data) => {
        console.log(RNTesseractOcr);
      });
    }
  };

  toggleView = () => {
    this.setState({
      showGallery: !this.state.showGallery
    });
  };

  renderFace = ({
    bounds, faceID, rollAngle, yawAngle
  }) => (
    <View
      key={faceID}
      transform={[
        { perspective: 600 },
        { rotateZ: `${rollAngle.toFixed(0)}deg` },
        { rotateY: `${yawAngle.toFixed(0)}deg` }
      ]}
      style={[
        styles.face,
        {
          ...bounds.size,
          left: bounds.origin.x,
          top: bounds.origin.y
        }
      ]}
    >
      <Text style={styles.faceText}>ID: {faceID}</Text>
      <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
      <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
    </View>
  );

  renderLandmarksOfFace = (face) => {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2
            }
          ]}
        />
      );
    return (
      <View key={`landmarks-${face.faceID}`}>
        {renderLandmark(face.leftEyePosition)}
        {renderLandmark(face.rightEyePosition)}
        {renderLandmark(face.leftEarPosition)}
        {renderLandmark(face.rightEarPosition)}
        {renderLandmark(face.leftCheekPosition)}
        {renderLandmark(face.rightCheekPosition)}
        {renderLandmark(face.leftMouthPosition)}
        {renderLandmark(face.mouthPosition)}
        {renderLandmark(face.rightMouthPosition)}
        {renderLandmark(face.noseBasePosition)}
        {renderLandmark(face.bottomMouthPosition)}
      </View>
    );
  };

  renderFaces() {
    return (
      <View style={styles.facesContainer} pointerEvents="none">
        {this.state.faces.map(this.renderFace)}
      </View>
    );
  }

  renderLandmarks() {
    return (
      <View style={styles.facesContainer} pointerEvents="none">
        {this.state.faces.map(this.renderLandmarksOfFace)}
      </View>
    );
  }

  renderNoPermissions = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
      }}
    >
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>
  );

  renderCamera() {
    return (
      <Camera
        ref={(ref) => {
          this.camera = ref;
        }}
        style={{
          flex: 1
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        faceDetectionLandmarks={Camera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={this.onFacesDetected}
        onFaceDetectionError={this.onFaceDetectionError}
        focusDepth={this.state.depth}
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: Constants.statusBarHeight / 2
          }}
        >
          <TouchableOpacity style={styles.flipButton} onPress={() => this.props.dispatch(navChange(types.DASHBOARD_SCREEN))}>
            <Text style={styles.flipText}> BACK </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing}>
            <Text style={styles.flipText}> FLIP </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash}>
            <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginBottom: -5
          }}
        >
          {this.state.autoFocus !== 'on' ? (
            <Slider
              style={{
                width: 150,
                marginTop: 15,
                marginRight: 15,
                alignSelf: 'flex-end'
              }}
              onValueChange={this.setFocusDepth}
              step={0.1}
            />
          ) : null}
        </View>
        <View
          style={{
            flex: 0.1,
            paddingBottom: 0,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end'
          }}
        >
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
            onPress={this.takePicture}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = this.state.showGallery ? this.renderGallery() : cameraScreenContent;
    return <View style={styles.container}>{content}</View>;
  }
}
