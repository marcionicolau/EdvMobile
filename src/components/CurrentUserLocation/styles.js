import styled from 'styled-components/native';
import { colors, metrics } from '~/assets';

export const Container = styled.View`
  border-radius: ${metrics.baseRadius}px;
  flex-direction: row;

  position: absolute;
  bottom: ${metrics.basePadding / 2}px;
  left: ${metrics.baseMargin}px;
  right: ${metrics.baseMargin}px;
  padding-left: ${metrics.basePadding}px;
  padding-right: ${metrics.basePadding}px;

  min-height: 50px;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.darkTransparent};
`;

export const PositionText = styled.Text`
  color: ${colors.white};
`;

export const PositionValue = styled.Text`
  color: ${colors.greyOutline};
`;
