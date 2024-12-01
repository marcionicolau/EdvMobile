import React from 'react';
import PropTypes from 'prop-types';

import { Container, PositionText, PositionValue } from './styles';

const formatGeolocation = (info) => (info !== null ? parseFloat(info).toFixed(4) : 'Não disponível');

const CurrentUserLocation = ({ latitude, longitude }) => (
  <Container>
    <PositionText>Posição Atual: </PositionText>
    <PositionText>[</PositionText>
    <PositionValue>{formatGeolocation(longitude)}</PositionValue>
    <PositionText>,</PositionText>
    <PositionValue>{formatGeolocation(latitude)}</PositionValue>
    <PositionText>]</PositionText>
  </Container>
);

CurrentUserLocation.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default CurrentUserLocation;
