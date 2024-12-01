/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform, Animated, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from 'react-native-geolocation-service';
import { bindActionCreators } from 'redux';
import DiagnosticActions from '~/store/ducks/diagnostics';

import {
  ContainerSafe,
  TopBar,
  TextNoPermission,
  MapboxContainer,
} from './styles';

import styles from './animatedStyles';
import MapConfig from '~/config/MapConfig';
import CurrentUserLocation from '~/components/CurrentUserLocation';

MapboxGL.setAccessToken(MapConfig.get('accessToken'));

class ShowMap extends Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="map-marker-radius" size={30} color={tintColor} />
    ),
  };

  static propTypes = {
    diagnosticsData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    getAllDiagnosticsRequest: PropTypes.func.isRequired,
  };

  state = {
    isFetchingAndroidPermission: Platform.OS === 'android',
    isAndroidPermissionGranted: false,
    userLocation: {
      latitude: null,
      longitude: null,
    },
    error: null,
    centerMap: [],
    localDiagnostics: [],
    activeAnnotationIndex: -1,
    previousAnnotationIndex: -1,
  };

  scaleIn = null;

  scaleOut = null;

  async componentDidMount() {
    await this.checkMapPermissions();
    await this.getActualLocation();
    await this.getDiagnosticsItems();
    MapboxGL.locationManager.start();
  }

  componentWillUnmount() {
    MapboxGL.locationManager.dispose();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.diagnosticsData !== prevState.localDiagnostics) {
      return {
        localDiagnostics: nextProps.diagnosticsData,
      };
    }
    return null;
  }

  getDiagnosticsItems = async () => {
    const { getAllDiagnosticsRequest } = this.props;
    await getAllDiagnosticsRequest();
  };

  checkMapPermissions = async () => {
    if (Platform.OS === 'android') {
      const isGranted = await MapboxGL.requestAndroidLocationPermissions();
      this.setState({
        isAndroidPermissionGranted: isGranted,
        isFetchingAndroidPermission: false,
      });
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
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  createDiagnosticFeatures = () => {
    const { localDiagnostics } = this.state;

    const featureCollection = MapboxGL.geoUtils.makeFeatureCollection();

    const items = localDiagnostics.map((diagData) => {
      const animationStyle = {};
      animationStyle.transform = [{ scale: this.scaleView }];

      return {
        type: 'Feature',
        key: diagData.id.toString(),
        id: diagData.id.toString(),
        title: diagData.label,
        subtitle: diagData.score,
        properties: {
          animationStyle,
          label: diagData.label,
          score: diagData.score,
          textField: `${diagData.label} (${diagData.score})`,
          title: diagData.label,
          subtitle: diagData.score,
        },
        textField: `${diagData.label} (${diagData.score})`,
        geometry: {
          type: 'Point',
          coordinates: [
            parseFloat(diagData.longitude),
            parseFloat(diagData.latitude),
          ],
        },
      };
    });

    featureCollection.features = items;

    return featureCollection;
  };

  renderDiagnostics = () => {
    const {
      activeAnnotationIndex,
      previousAnnotationIndex,
      localDiagnostics,
    } = this.state;

    const items = localDiagnostics.map((c, i) => {
      const animationStyle = {};
      if (i === activeAnnotationIndex) {
        animationStyle.transform = [{ scale: this.scaleIn }];
      } else if (i === previousAnnotationIndex) {
        animationStyle.transform = [{ scale: this.scaleOut }];
      }

      return (
        <MapboxGL.PointAnnotation
          key={c.id.toString()}
          id={c.id.toString()}
          onSelected={(feature) => this.onAnnotationSelected(i, feature)}
          onDeselected={() => this.onAnnotationDeselected(i)}
          coordinate={[parseFloat(c.longitude), parseFloat(c.latitude)]}
        >
          <View style={styles.annotationContainer}>
            <Animated.View style={[styles.annotationFill, animationStyle]} />
          </View>

          <MapboxGL.Callout title={`${c.label} (${c.score})`} />
        </MapboxGL.PointAnnotation>
      );
    });

    return items;
  };

  onAnnotationSelected = (activeIndex, feature) => {
    const { previousActiveAnnotationIndex, activeAnnotationIndex } = this.state;

    if (activeAnnotationIndex === activeIndex) {
      return;
    }

    this.scaleIn = new Animated.Value(0.6);
    Animated.timing(this.scaleIn, { toValue: 1.0, duration: 200 }).start();
    this.setState({ activeAnnotationIndex: activeIndex });

    if (previousActiveAnnotationIndex !== -1) {
      this.mapCameraRef.moveTo(feature.geometry.coordinates, 500);
    }
  };

  onAnnotationDeselected = (deselectedIndex) => {
    const { activeAnnotationIndex } = this.state;

    const nextState = {};

    if (activeAnnotationIndex === deselectedIndex) {
      nextState.activeAnnotationIndex = -1;
    }

    this.scaleOut = new Animated.Value(1);
    Animated.timing(this.scaleOut, { toValue: 0.6, duration: 200 }).start();
    nextState.previousAnnotationIndex = deselectedIndex;
    this.setState(nextState);
  };

  render() {
    const {
      error,
      userLocation,
      centerMap,
      isAndroidPermissionGranted,
      isFetchingAndroidPermission,
      localDiagnostics,
    } = this.state;

    if (Platform.OS === 'android' && !isAndroidPermissionGranted) {
      if (isFetchingAndroidPermission) {
        return null;
      }
      return (
        <ContainerSafe>
          <TopBar />
          <TextNoPermission>
            É necessária a permissão para acesso a sua localização.
          </TextNoPermission>
        </ContainerSafe>
      );
    }
    return (
      <ContainerSafe>
        {error && (
          <>
            <Text>{error}</Text>
          </>
        )}
        {userLocation.latitude && localDiagnostics.length > 0 && (
          <>
            <MapboxContainer ref={(ref) => (this.mapRef = ref)}>
              <MapboxGL.Camera
                zoomLevel={7}
                animationMode="flyTo"
                animationDuration={5000}
                showUserLocation
                ref={(ref) => (this.mapCameraRef = ref)}
                centerCoordinate={centerMap}
              />
              <MapboxGL.UserLocation />

              {this.renderDiagnostics()}
            </MapboxContainer>
            <CurrentUserLocation {...userLocation} />
          </>
        )}
      </ContainerSafe>
    );
  }
}

const mapStateToProps = (state) => ({
  diagnosticsData: state.diagnostics.data,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(DiagnosticActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowMap);
