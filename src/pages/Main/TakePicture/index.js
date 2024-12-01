/* eslint-disable react/no-unused-state */
/* eslint-disable consistent-return */
/* eslint-disable react-native/split-platform-components */
import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  Alert,
  CameraRoll,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import Tflite from 'tflite-react-native';
import Geolocation from 'react-native-geolocation-service';
import * as Sentry from '@sentry/react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DiagnosticActions from '~/store/ducks/diagnostics';
import RenderBoxesView from '~/components/RenderBoxesView';

import {
  CameraPickerPreview,
  ContainerSafe,
  DiagnosePictureButton,
  DiagnosePictureButtonRow,
  DiagnosePictureButtonText,
  GradientContainer,
  ImagePreview,
  SnapPictureButton,
  SnapPictureButtonRow,
  SnapPictureButtonText,
  SnapPictureContainer,
  Title,
  TopBar,
} from './styles';

const tflite = new Tflite();

class TakePicture extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      addListener: PropTypes.func,
    }).isRequired,
    saveDiagnosticRequest: PropTypes.func.isRequired,
  };

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="camera" size={30} color={tintColor} />
    ),
  };

  mask = {
    width: 750,
    height: 750,
  };

  state = {
    loading: false,
    focusedScreen: true,
    image: null,
    error: null,
    checked: false,
    localImage: {
      image: null,
      recognitions: null,
    },
    isFetchingAndroidPermission: Platform.OS === 'android',
    isAndroidPermissionGranted: false,
    userLocation: {
      latitude: null,
      longitude: null,
    },
  };

  async componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => this.setState({ focusedScreen: true }));
    navigation.addListener('willBlur', () => this.setState({ focusedScreen: false }));

    await this.prepareYoloModel();
    await this.getActualLocation();
  }

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'EdvMobile App Location Permission',
          message: 'EdvMobile App precisa acessar a sua localização.',
          // buttonNeutral: "Perguntar Depois",
          // buttonNegative: "Cancel",
          // buttonPositive: "OK"
        },
      );
      this.setState({
        isAndroidPermissionGranted:
          granted === PermissionsAndroid.RESULTS.GRANTED,
        isFetchingAndroidPermission: false,
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  getActualLocation = async () => {
    await Geolocation.getCurrentPosition(
      ({ coords }) => {
        this.setState({
          userLocation: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          error: null,
          centerMap: [coords.longitude, coords.latitude],
        });
      },
      (error) => {
        // See error code charts below.
        this.setState({ error: error.message });
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  submitPicture = async () => {
    const { image } = this.state;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Access Storage',
          message: 'Access Storage for the pictures',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await CameraRoll.saveToCameraRoll(image.uri);
      } else {
        this.setState({ error: { message: 'Permissao de camera negada.' } });
      }
    } catch (err) {
      this.setState({ erro: { message: err.message } });
    }
    this.setDiagnosticContent(true);
    this.setState({
      image: null,
    });
  };

  requestPermissions = async (
    hasVideoAndAudio,
    CameraManager,
    permissionDialogTitle,
    permissionDialogMessage,
  ) => {
    if (Platform.OS === 'ios') {
      const check = hasVideoAndAudio
        ? CameraManager.checkDeviceAuthorizationStatus
        : CameraManager.checkVideoAuthorizationStatus;

      if (check) {
        const isAuthorized = await check();
        return isAuthorized;
      }
    } else if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: permissionDialogTitle,
          message: permissionDialogMessage,
        },
      );

      // On devices before SDK version 23, the permissions are automatically
      // granted if they appear in the manifest, so check and request should
      // always be true.
      // https://github.com/facebook/react-native-website/blob/master/docs/permissionsandroid.md
      // eslint-disable-next-line max-len
      const isAuthorized = Platform.Version >= 23
        ? granted === PermissionsAndroid.RESULTS.GRANTED
        : granted === true;

      return isAuthorized;
    }
    return true;
  };

  prepareYoloModel = () => {
    tflite.loadModel({
      model: 'nnets/tiny_yolo_deepspot_3820.tflite',
      labels: 'nnets/deepspot_yolo_classes.txt',
      numThreads: 1,
    }, (err) => {
      if (err) {
        Sentry.captureException(err);
      }
    });
  };

  handleExluir = () => {
    const { checked } = this.state;
    if (checked) {
      this.setDiagnosticContent(false);
    }
    this.setState({
      image: null,
      checked: false,
    });
  };

  recognitionFlow = () => {
    const { checked } = this.state;

    return checked ? this.submitPicture() : this.detectObject();
  };

  detectObject = () => {
    const { image } = this.state;
    this.setState({ loading: true });

    tflite.detectObjectOnImage(
      {
        path: image.uri,
        model: 'YOLO',
        imageMean: 0.0,
        imageStd: 255.0,
        threshold: 0.4, // defaults to 0.1
        numResultsPerClass: 3, // defaults to 5
        // defaults to [0.57273,0.677385,1.87446,2.06253,3.33843,5.47434,7.88282,3.52778,
        // 9.77052,9.16828]
        anchors: [31, 24, 31, 44, 56, 81, 62, 32, 95, 165, 143, 435, 159, 52, 346, 239, 414, 933],
        blockSize: 32, // defaults to 32
      },
      (err, res) => {
        if (err) {
          this.setState({ loading: false });
          return Sentry.captureException(err);
        }

        this.setState({
          localImage: {
            image,
            recognitions: res,
          },
          checked: true,
          loading: false,
        });
      },
    );
  };

  setDiagnosticContent = (saved) => {
    const {
      userLocation, localImage,
    } = this.state;

    const data = {
      imageUri: localImage.image.uri,
      recognitions: localImage.recognitions,
      labels: localImage.recognitions.map((i) => i.detectedClass),
      scores: localImage.recognitions.map((i) => i.confidenceInClass.toFixed(4)),
      ...userLocation,
      saved,
    };
    this.uploadDiagnosticContent(data);
  };

  uploadDiagnosticContent = async (data) => {
    const { saveDiagnosticRequest } = this.props;
    await saveDiagnosticRequest(data);
    this.setState({
      localImage: {
        image: null,
        recognitions: null,
      },
    });
  };

  stateImageContent = (imageContent) => ({
    localImage: {
      image: {
        uri: imageContent.path,
        width: imageContent.width,
        height: imageContent.height,
        mime: imageContent.mime,
      },
    },
    image: {
      uri: imageContent.path,
      width: imageContent.width,
      height: imageContent.height,
      mime: imageContent.mime,
    },
  });

  handlePickFromCamera = (cropit, mediaType = 'photo') => {
    ImagePicker.openCamera({
      cropping: cropit,
      width: this.mask.width,
      height: this.mask.height,
      cropperToolbarTitle: 'Recortar Imagem',
      cropperActiveWidgetColor: '#424242',
      cropperStatusBarColor: '#424242',
      cropperToolbarColor: '#424242',
      mediaType,
    })
      .then(async (imageContent) => {
        await this.setState({
          ...this.stateImageContent(imageContent),
          checked: false,
        });
      })
      .catch((err) => {
        const msg = err.message ? err.message : err;
        Alert(msg);
        Sentry.captureException(err);
      });
  };

  handlePickFromGallery = (cropit, circular = false, mediaType = 'photo') => {
    ImagePicker.openPicker({
      width: this.mask.width,
      height: this.mask.height,
      cropping: cropit,
      mediaType,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      cropperToolbarTitle: 'Recortar Imagem',
      cropperActiveWidgetColor: '#424242',
      cropperStatusBarColor: '#424242',
      cropperToolbarColor: '#424242',
    })
      .then(async (imageContent) => {
        await this.setState({
          ...this.stateImageContent(imageContent),
          checked: false,
        });
      })
      .catch((e) => {
        const msg = e.message ? e.message : e;
        Alert(msg);
        Sentry.captureException(e);
      });
  };

  cameraView = () => {
    const {
      image, localImage, checked, loading,
    } = this.state;

    return (
      <ContainerSafe>
        <TopBar />
        {image && image.uri ? (
          <ImagePreview source={{ uri: image.uri }}>
            <ScrollView />
            {checked
              ? (
                <RenderBoxesView
                  recognitions={localImage.recognitions}
                  image={localImage.image}
                  mask={{
                    width: 300,
                    height: 300,
                  }}
                />
              ) : null}
            <DiagnosePictureButtonRow>
              <DiagnosePictureButton onPress={this.handleExluir}>
                <DiagnosePictureButtonText>Excluir</DiagnosePictureButtonText>
              </DiagnosePictureButton>

              <DiagnosePictureButton
                onPress={() => this.recognitionFlow()}
                checked={checked}
              >
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <DiagnosePictureButtonText checked={checked}>
                    {checked ? 'Salvar' : 'Diagnosticar'}
                  </DiagnosePictureButtonText>
                )}
              </DiagnosePictureButton>
            </DiagnosePictureButtonRow>
          </ImagePreview>
        ) : (
          <CameraPickerPreview>
            <SnapPictureContainer>
              <SnapPictureButtonRow>
                <SnapPictureButton
                  onPress={() => this.handlePickFromGallery(true)}
                >
                  <SnapPictureButtonText> SELECIONAR </SnapPictureButtonText>
                </SnapPictureButton>
                <SnapPictureButton
                  onPress={() => this.handlePickFromCamera(true)}
                >
                  <SnapPictureButtonText> CAPTURAR </SnapPictureButtonText>
                </SnapPictureButton>
              </SnapPictureButtonRow>
            </SnapPictureContainer>
          </CameraPickerPreview>
        )}
      </ContainerSafe>
    );
  };

  render() {
    const { hasCameraPermission, focusedScreen } = this.state;
    if (hasCameraPermission === null) {
      return (
        <GradientContainer>
          <TopBar />
        </GradientContainer>
      );
    }
    if (hasCameraPermission === false) {
      return <Title>No access to camera</Title>;
    }
    if (focusedScreen) {
      return this.cameraView();
    }
    return (
      <GradientContainer>
        <TopBar />
      </GradientContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  diagnostics: state.diagnostics,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(DiagnosticActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TakePicture);
