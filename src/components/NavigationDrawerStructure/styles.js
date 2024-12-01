import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, metrics } from '~/assets';

export const Container = styled.View`
  flex-direction: row;
`;

export const ToogleButton = styled.TouchableOpacity``;

export const ToogleButtonImage = styled(Icon).attrs({
  size: 30,
  name: 'menu',
  color: colors.white,
})`
  margin-left: ${metrics.baseMargin}px;
  margin-right: ${metrics.baseMargin}px;
`;
