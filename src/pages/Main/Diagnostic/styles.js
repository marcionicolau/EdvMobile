import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform } from 'react-native';
import { colors, metrics } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

const blue = '#25d5fd';

export const TopBar = styled.StatusBar.attrs({
  backgroundColor: Platform.select({ android: colors.primary }),
  barStyle: Platform.select({ ios: 'light-content' }),
})``;

// Containers
export const GradientContainer = styled(LinearGradient).attrs({
  colors: [colors.grey3, colors.grey5],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  flex: 1;
`;

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  padding-left: ${metrics.basePadding / 2}px;
  padding-right: ${metrics.basePadding / 2}px;

  background-color: ${colors.greyOutline};
  align-items: center;
`;

export const PhotoContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.height || 0}px;
  width: ${(props) => props.width || 0}px;
  border-style: dashed;
  border-width: ${(props) => (props.source ? 0 : 1)}px;
  border-color: ${colors.secondary};
  border-radius: ${metrics.baseRadius}px;
  background-color: ${(props) => (props.source ? colors.transparent : colors.whiteTransparent)};
  margin-top: ${metrics.baseMargin}px;
`;

export const Boxes = styled.View`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
`;

export const BoxDetection = styled.View`
  position: absolute;
  border: 2px solid ${(props) => (props.main ? colors.disease1 : colors.disease2)};;
  left: ${(props) => props.left || 0}px;
  right: ${(props) => props.right || 0}px;
  bottom: ${(props) => props.bottom || 0}px;
  top: ${(props) => props.top || 0}px;
`;

export const ActionsContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${metrics.baseMargin / 2}px;
  margin-top: ${metrics.baseMargin / 4}px;
`;

export const ActionsButtonRow = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: stretch;
  margin-left: ${metrics.baseMargin / 2}px;
  margin-right: ${metrics.baseMargin / 2}px;
`;


// Images
export const ImageDisplay = styled.Image`
  flex: 1;
  height: ${(props) => props.height || 0}px;
  width: ${(props) => props.width || 0}px;
  border-radius: ${metrics.baseRadius}px;
  resize-mode: contain;
`;

// Texts
export const TitleDetection = styled.Text`
  color: white;
  background-color: ${blue};
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: ${responsiveText(26)}px;
  font-weight: bold;
  text-align: center;
  margin-bottom: ${metrics.baseMargin}px;
`;


// Buttons
export const ActionsButton = styled.TouchableOpacity`
  align-self: center;
  background-color: ${(props) => (props.disabled ? colors.secondary2 : colors.primary)};
  border-radius: ${metrics.baseRadius}px;
  padding-left: ${metrics.basePadding * 1.5}px;
  padding-right: ${metrics.basePadding * 1.5}px;
  padding-top: ${metrics.basePadding / 2}px;
  padding-bottom: ${metrics.basePadding / 2}px;
  margin: ${metrics.baseMargin}px;
`;

// Icon Button
export const ActionsIcon = styled(Icon).attrs((props) => ({
  name: props.name,
  size: 25,
}))`
  color: ${colors.white};
`;
