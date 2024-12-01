import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, ContainerBadge, BadgeText } from './styles';

const IconWithBadge = ({
  name, badgeCount, color, size,
}) => (
  <Container>
    <Icon name={name} size={size} color={color} />
    {badgeCount > 0 && (
      <ContainerBadge>
        <BadgeText>{badgeCount}</BadgeText>
      </ContainerBadge>
    )}
  </Container>
);

IconWithBadge.propTypes = {
  name: PropTypes.string.isRequired,
  badgeCount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default IconWithBadge;
