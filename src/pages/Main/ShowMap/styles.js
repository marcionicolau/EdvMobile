import styled from 'styled-components/native';
import { Platform, StyleSheet, Animated } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { colors, metrics } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
`;

export const MapboxContainer = styled(MapboxGL.MapView).attrs({
  styleURL: MapboxGL.StyleURL.Light,
})`
  flex: 1;
`;

export const TopBar = styled.StatusBar.attrs({
  backgroundColor: Platform.select({ android: colors.primary }),
  barStyle: Platform.select({ ios: 'light-content' }),
})``;

export const TextNoPermission = styled.Text`
  font-size: ${responsiveText(18)}px;
  font-weight: bold;
`;

export const AnnotationContainer = styled.View`
  width: ${metrics.annotationSize}px;
  height: ${metrics.annotationSize}px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  border-radius: ${metrics.annotationSize / 2}px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-color: ${colors.darkTransparent};
`;

export const AnnotationFill = styled(Animated.View)`
  width: ${metrics.annotationSize - 3}px;
  height: ${metrics.annotationSize - 3}px;
  border-radius: ${(metrics.annotationSize - 3) / 2}px;
  background-color: ${colors.primary2};
  transform: scale(0.6);
`;
