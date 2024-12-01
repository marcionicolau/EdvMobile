import styled from 'styled-components/native';
import { colors, metrics } from '~/assets';

export const Container = styled.View`
  border-radius: ${metrics.baseRadius}px;

  position: absolute;
  bottom: ${metrics.basePadding / 2}px;
  left: ${metrics.baseMargin}px;
  right: ${metrics.baseMargin}px;
  padding-left: ${metrics.basePadding}px;
  padding-right: ${metrics.basePadding}px;

  min-height: 60px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.darkTransparent};
`;
