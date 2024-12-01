import styled from 'styled-components/native';
import { colors, metrics } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

export const ErrorMessage = styled.Text`
  color: ${colors.danger};
  margin-bottom: ${metrics.baseMargin}px;
  text-align: center;
  font-size: ${responsiveText(16)}px;
  font-weight: bold;
`;
