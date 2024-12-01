import styled from 'styled-components/native';
import { colors, metrics } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.darker,
  underlineColorAndroid: 'transparent',
})`
  background: ${colors.grey5};
  border-radius: ${metrics.baseRadius}px;
  padding: 0 ${metrics.basePadding}px;
  margin: ${metrics.baseMargin}px 0;
  height: 42px;
  font-size: ${responsiveText(16)}px;
  color: ${colors.darker};
  border-width: ${(props) => (props.error ? 1 : 0)}px;
  border-color: ${(props) => (props.error ? colors.danger : colors.grey4)};
`;
