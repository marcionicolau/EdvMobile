import styled from 'styled-components/native';
import { colors } from '~/assets';

export const Container = styled.View`
  width: 24px;
  height: 24px;
  margin: 5px;
`;

export const ContainerBadge = styled.View`
  position: absolute;
  right: -6px;
  top: -3px;

  background-color: ${colors.danger};
  border-radius: 6px;
  width: 12px;
  height: 12px;
  justify-content: center;
  align-items: center;
`;

export const BadgeText = styled.Text`
  color: ${colors.white};
  font-size: 10px;
  font-weight: bold;
`;
