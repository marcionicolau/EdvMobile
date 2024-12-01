import React, { PureComponent } from 'react';
import {
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import Tflite from 'tflite-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-picker';


import * as Sentry from '@sentry/react-native';
import DiagnosticActions from '~/store/ducks/diagnostics';
import { metrics } from '~/assets';

import {
  ActionsButton,
  ActionsButtonRow,
  ActionsContainer,
  ActionsIcon, Boxes,
  BoxDetection,
  ContainerSafe,
  GradientContainer,
  ImageDisplay,
  PhotoContainer,
  Title,
  TopBar,
} from './styles';
import DiagnosticLegend from '~/components/DiagnosticLegend';
import labelsFromNet from '~/helpers/labelsFromNet';


const tflite = new Tflite();


class Diagnostic extends PureComponent {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="microscope" size={30} color={tintColor} />
    ),
  };

  constructor(props) {
    super(props);

    this.cameraOptions = {
      title: 'Selecione a Imagem',
      cancelButtonTitle: 'Cancelar',
      cameraType: 'back',
      mediaType: 'photo',
      allowsEditing: true,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    this.maxHeight = Math.round(metrics.screenHeight * 0.65);
    this.maxWidth = Math.round(metrics.screenWidth - 2 * metrics.basePadding);

    this.state = {
      userLocation: {
        latitude: null,
        longitude: null,
      },
      // loading: false,
      focusedScreen: true,
      error: null,
      centerMap: null,
      source: null,
      imageHeight: this.maxHeight,
      imageWidth: this.maxWidth,
      recognitions: [],
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => this.setState({ focusedScreen: true }));
    navigation.addListener('willBlur', () => this.setState({ focusedScreen: false }));

    const labels = await labelsFromNet();

    this.setState({ labels });

    await this.prepareYoloModel();
    await this.getActualLocation();
  }

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


  renderResults = () => {
    const {
      recognitions, imageHeight, imageWidth, labels,
    } = this.state;

    return recognitions.map((res, id) => {
      const {
        rect: {
          x, y, w, h,
        },
        detectedClass,
      } = res;

      const left = x * imageWidth;
      const top = y * imageHeight;
      const width = w * imageWidth;
      const height = h * imageHeight;

      return (
        <BoxDetection
          key={`box-detection-${id}`}
          top={top}
          left={left}
          width={width}
          height={height}
          main={detectedClass === labels[0]}
        />
      );
    });
  };

  handlePickFromCamera = () => {
    ImagePicker.launchCamera(this.cameraOptions, (response) => this.handleResponse(response));
  };


  handlePickFromGallery = () => {
    ImagePicker.launchImageLibrary(this.cameraOptions, (response) => this.handleResponse(response));
  };

  handleSave = () => {
  };

  handleDelete = () => {
    this.setState({
      recognitions: [],
      source: null,
      imageHeight: this.maxHeight,
      imageWidth: this.maxWidth,
    });
  };

  rescaleImage = (width, height) => {
    const maxHeight = Math.round(metrics.screenHeight * 0.65);
    const maxWidth = Math.round(metrics.screenWidth * 0.9);
    const ratio = Math.min(maxWidth / width, maxHeight / height);

    return {
      finalWidth: Math.round(width * ratio),
      finalHeight: Math.round(height * ratio),
    };
  };

  handleResponse = (content) => {
    if (content.didCancel) {
      this.setState({
        source: null, imageHeight: this.maxHeight, imageWidth: this.maxWidth, recognitions: [],
      });
      Sentry.captureMessage('User cancelled image picker');
    } else if (content.error) {
      this.setState({
        source: null, imageHeight: this.maxHeight, imageWidth: this.maxWidth, recognitions: [],
      });
      Sentry.captureException(content.error);
    } else {
      const path = Platform.OS === 'ios' ? content.uri : `file://${content.path}`;
      const w = content.width;
      const h = content.height;

      const { finalWidth, finalHeight } = this.rescaleImage(w, h);

      this.setState({
        source: { uri: path },
        imageHeight: finalHeight,
        imageWidth: finalWidth,
      });

      tflite.detectObjectOnImage({
        path,
        model: 'YOLO',
        imageMean: 0.0,
        imageStd: 255.0,
        threshold: 0.7,
        numResultsPerClass: 5,
      },
      (err, res) => {
        if (err) {
          Sentry.captureException(err);
        } else {
          this.setState({ recognitions: res });
        }
      });
    }
  };

  cameraView = () => {
    const {
      source, imageHeight, imageWidth, recognitions,
    } = this.state;


    return (
      <ContainerSafe>
        <TopBar />
        {source && <DiagnosticLegend recognitions={recognitions} /> }

        <PhotoContainer
          source={!!source}
          height={this.maxHeight}
          width={this.maxWidth}
        >
          {source && (
            <ImageDisplay
              source={source}
              height={imageHeight}
              width={imageWidth}
            />
          )}
          <Boxes>
            {this.renderResults()}
          </Boxes>
        </PhotoContainer>

        <ActionsContainer>
          <ActionsButtonRow>
            <ActionsButton
              onPress={this.handlePickFromCamera}
            >
              <ActionsIcon name="camera" />
            </ActionsButton>
            <ActionsButton
              onPress={this.handlePickFromGallery}
            >
              <ActionsIcon name="image-multiple" />
            </ActionsButton>


            <ActionsButton disabled={!source}>
              <ActionsIcon name="content-save" />
            </ActionsButton>

            <ActionsButton onPress={this.handleDelete} disabled={!source}>
              <ActionsIcon name="trash-can-outline" />
            </ActionsButton>

          </ActionsButtonRow>
        </ActionsContainer>
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


Diagnostic.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func,
  }).isRequired,
  saveDiagnosticRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  diagnostics: state.diagnostics,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(DiagnosticActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Diagnostic);
