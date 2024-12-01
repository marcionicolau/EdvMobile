import styled from 'styled-components/native';
import { metrics } from '~/assets';

export const SwitchContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SwitchComponent = styled.Switch``;

export const SwitchLabel = styled.Text`
  margin-right: ${metrics.baseMargin / 2}px;
`;
