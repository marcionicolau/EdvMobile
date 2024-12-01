import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Platform } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, metrics } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-left: ${metrics.basePadding / 2}px;
  padding-right: ${metrics.basePadding / 2}px;

  background-color: ${colors.black};
`;

export const GradientContainer = styled(LinearGradient).attrs({
  colors: [colors.grey3, colors.grey5],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  flex: 1;
`;

export const TopBar = styled.StatusBar.attrs({
  backgroundColor: Platform.select({ android: colors.primary }),
  barStyle: Platform.select({ ios: 'light-content' }),
})``;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: ${responsiveText(26)}px;
  font-weight: bold;
  text-align: center;
  margin-bottom: ${metrics.baseMargin}px;
`;

export const CameraPickerPreview = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const SnapPictureContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${metrics.baseMargin * 4}px;
`;

export const SnapPictureButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: ${metrics.basePadding}px;
`;

export const SnapPictureButton = styled.TouchableOpacity`
  align-self: center;
  background-color: ${colors.white};
  border-radius: ${metrics.baseRadius}px;
  padding: ${metrics.basePadding}px;
  margin: ${metrics.baseMargin}px;
`;

export const SnapPictureButtonText = styled.Text`
  font-size: ${responsiveText(14)}px;
  color: ${colors.primary};
`;

export const ImagePreview = styled.ImageBackground`
  flex: 1;
  width: ${metrics.screenWidth}px;
`;

// export const DiagnoseContainer = styled.View`
//   background-color: ${colors.white};
//   margin: ${metrics.baseMargin * 3}px;
//   padding: ${metrics.basePadding}px;
//
//   justify-content: center;
//   align-items: center;
//   border-radius: ${metrics.baseRadius * 3}px;
//   border-width: 1px;
//   border-color: ${colors.greyOutline};
// `;
//
// export const DiagnoseTitle = styled.Text`
//   font-size: ${responsiveText(20)}px;
//   font-weight: bold;
//   margin-bottom: ${metrics.baseMargin}px;
//   color: ${colors.primary};
// `;
//
// export const DiagnoseScore = styled.Text`
//   font-size: ${responsiveText(16)}px;
//   font-weight: 400;
//   color: ${colors.secondary};
// `;

export const DiagnosePictureButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: ${metrics.basePadding}px;
`;

export const DiagnosePictureButton = styled.TouchableOpacity`
  width: ${(metrics.screenWidth - metrics.baseMargin * 4) / 2.5}px;
  align-items: center;
  background-color: ${(props) => (props.checked ? colors.primary : colors.white)};
  border-radius: ${metrics.baseRadius}px;
  padding: ${metrics.basePadding}px;
  margin: ${metrics.baseMargin}px;
  font-weight: bold;
`;

export const DiagnosePictureButtonText = styled.Text`
  font-size: ${responsiveText(12)}px;
  font-weight: bold;
  color: ${(props) => (props.checked ? colors.white : colors.primary)};
`;
