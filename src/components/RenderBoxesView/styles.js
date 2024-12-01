import styled from 'styled-components/native';
import { colors, metrics } from '~/assets';
import responsiveText from '~/helpers/responsiveText';

export const BoxesContainer = styled.View`
    position: absolute;
    border-color: ${colors.danger};
    border-width: 2px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    top: 0px;
`;

export const BoxDetection = styled.View`
    position: absolute;
    left: ${(props) => props.left || 0}px;
    right: ${(props) => props.right || 0}px;
    bottom: ${(props) => props.bottom || 0}px;
    top: ${(props) => props.top || 0}px;
    border-color: ${colors.disease1};
    border-width: 2px;
`;

export const BoxScore = styled.Text`
  color: ${colors.primary1};
  font-weight: 300;
  font-size: ${responsiveText(20)}px;
  background-color: ${colors.disease1};
`;

export const DiagnoseContainer = styled.View`
  background-color: ${colors.white};
  margin: ${metrics.baseMargin * 3}px;
  padding: ${metrics.basePadding}px;

  justify-content: center;
  align-items: center;
  border-radius: ${metrics.baseRadius * 3}px;
  border-width: 1px;
  border-color: ${colors.greyOutline};
`;

export const DiagnoseTitle = styled.Text`
  font-size: ${responsiveText(20)}px;
  font-weight: bold;
  margin-bottom: ${metrics.baseMargin}px;
  color: ${colors.primary};
`;

export const DiagnoseScore = styled.Text`
  font-size: ${responsiveText(16)}px;
  font-weight: 400;
  color: ${colors.secondary};
`;
