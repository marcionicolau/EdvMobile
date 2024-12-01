import styled from 'styled-components/native';
import { Platform, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, metrics } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
`;

export const TopBar = styled.StatusBar.attrs({
  backgroundColor: Platform.select({ android: colors.primary }),
  barStyle: Platform.select({ ios: 'light-content' }),
})``;

export const DiagnosticList = styled(FlatList).attrs({
  contentContainerStyle: { paddingHorizontal: 5 },
})`
  margin-top: ${metrics.baseMargin / 2}px;
`;

export const BaseIcon = styled(Icon).attrs({
  size: 25,
})`
  margin-left: 4px;
`;

export const ContainerHeader = styled.View`
  align-self: center;
`;

export const TextHeader = styled.Text`
  align-self: center;
  font-size: ${responsiveText(14)}px;
  font-weight: 600;
  color: ${colors.secondary3};
`;

export const ContainerEmpty = styled.View`
  padding: ${metrics.basePadding * 1.5}px;
  justify-content: center;
  align-items: center;
  border: 1px;
  border-color: ${colors.grey5};
  background-color: ${colors.greyOutline};
`;

export const TextEmpty = styled.Text`
  align-self: center;
  font-size: ${responsiveText(26)}px;
  font-weight: 400;
  color: ${colors.primary};
  margin-bottom: ${metrics.baseMargin}px;
`;
