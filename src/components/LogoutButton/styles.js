import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, metrics } from '~/assets';

export const Container = styled.View`
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity``;

export const ButtonImage = styled(Icon).attrs({
  size: 30,
  name: 'logout',
  color: colors.white,
})`
  margin-left: ${metrics.baseMargin}px;
  margin-right: ${metrics.baseMargin}px;
`;
