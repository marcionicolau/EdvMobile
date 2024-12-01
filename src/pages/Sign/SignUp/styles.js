import styled from 'styled-components/native';
import { Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, metrics } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: space-evenly;
  padding-left: ${metrics.basePadding / 2}px;
  padding-right: ${metrics.basePadding / 2}px;
`;

export const TopBar = styled.StatusBar.attrs({
  backgroundColor: Platform.select({ android: colors.primary }),
  barStyle: Platform.select({ ios: 'light-content' }),
})``;

export const GradientContainer = styled(LinearGradient)
  .attrs({
    colors: [colors.primary2, colors.primary1],
    start: {
      x: 0,
      y: 0
    },
    end: {
      x: 1,
      y: 1
    },
  })`
  flex: 1;
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: ${responsiveText(26)}px;
  font-weight: bold;
  text-align: center;
  margin-bottom: ${metrics.baseMargin}px;
`;

export const Logo = styled.Image`
  height: ${metrics.screenHeight * 0.15}px;
  width: ${metrics.screenHeight * 0.15 * (1160 / 592)}px;
  margin-top: ${metrics.baseMargin * 2}px;
`;

export const FormContainer = styled.View`
  background: ${colors.white};
  align-items: stretch;
  padding: ${metrics.basePadding}px;
  margin: ${metrics.baseMargin * 2}px;
  border-radius: ${metrics.baseRadius}px;
  width: ${metrics.screenWidth - metrics.baseMargin * 6}px;
`;

export const Button = styled.TouchableOpacity`
  background: ${colors.secondary};
  border-radius: ${metrics.baseRadius}px;
  height: 42px;
  align-items: center;
  justify-content: center;
  margin-top: ${metrics.baseMargin}px;
`;

export const ButtonText = styled.Text`
  color: ${colors.white};
  font-size: ${responsiveText(18)}px;
  font-weight: bold;
`;

export const ErrorMessage = styled.Text`
  color: ${colors.danger};
  margin-bottom: ${metrics.baseMargin}px;
  text-align: center;
  font-size: ${responsiveText(16)}px;
  font-weight: bold;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const FooterInstructions = styled.Text`
  color: ${colors.dark};
  font-size: ${responsiveText(12)}px;
  margin-top: ${metrics.baseMargin}px;
  align-self: center;
`;

export const FooterLink = styled.Text`
  margin-left: ${metrics.baseMargin / 2}px;
  color: ${colors.secondary};
  font-size: ${responsiveText(12)}px;
  margin-top: ${metrics.baseMargin}px;
`;
