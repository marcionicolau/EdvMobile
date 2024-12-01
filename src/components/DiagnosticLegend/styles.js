import styled from 'styled-components/native';
import responsiveText from '~/helpers/responsiveText';
import { colors, metrics } from '~/assets';


export const Container = styled.View`
  display: flex;
  margin-top: ${metrics.baseMargin / 2}px;
  padding: ${metrics.basePadding / 4}px;
  align-items: center;
  justify-content: center;
`;

export const LegendContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Disease = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${metrics.basePadding}px;
  padding-right: ${metrics.basePadding}px;
`;

export const DiseaseCount = styled.Text`
  color: ${colors.secondary};
  font-size: ${responsiveText(14)}px;
  font-weight: bold;
  padding-left: ${metrics.basePadding / 4}px;
  padding-right: ${metrics.basePadding / 4}px;
`;

export const DiseaseText = styled.Text`
  color: ${colors.primary};
  font-size: ${responsiveText(14)}px;
`;


export const DiseaseIcon = styled.View`
  width: 18px;
  height: 18px;
  border-radius: 9px;
  background: ${(props) => (props.main ? colors.disease1 : colors.disease2)};
  margin-right: ${metrics.baseMargin}px;
`;


export const InformationText = styled.Text`
  font-size: ${responsiveText(16)}px;
  color: ${colors.primary};
  text-align: center;
`;
