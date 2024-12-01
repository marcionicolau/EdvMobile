import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { colors, metrics } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
`;

export const TopBar = styled.StatusBar.attrs({
  backgroundColor: Platform.select({ android: colors.primary }),
  barStyle: Platform.select({ ios: 'light-content' }),
})``;

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { alignItems: 'center' },
})`
  padding-left: ${metrics.basePadding / 2}px;
  padding-right: ${metrics.basePadding / 2}px;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: ${responsiveText(26)}px;
  font-weight: bold;
  text-align: center;
  margin: ${metrics.baseMargin}px;
`;

export const LatinText = styled.Text`
  color: ${colors.primary2};
  font-size: ${responsiveText(20)}px;
  font-style: italic;
  font-weight: normal;
  text-align: center;
  margin: ${metrics.baseMargin}px;
`;

export const Paragraph = styled.Text`
  font-size: ${responsiveText(16)}px;
  color: ${colors.grey3};
  text-align: justify;
  line-height: 25px;
  margin: ${metrics.baseMargin}px;
`;
