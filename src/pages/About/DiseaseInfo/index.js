import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  TopBar,
  ContainerSafe,
  Title,
  Paragraph,
  LatinText,
  Container,
} from './styles';

const TabIcon = ({ tintColor }) => (
  <Icon name="book-open-page-variant" size={30} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
const DiseaseInfo = () => (
  <ContainerSafe>
    <TopBar />
    <Container>
      <Title>Mancha Amarela do Trigo</Title>
      <LatinText>
        (Pyerenophora tritici-repentis; Drechslera tritici-repentis)
      </LatinText>
      <Paragraph>
        Doença causada por fungo necrotrófico, com capacidade de sobrevivência
        nos restos culturais do trigo. A infecção inicial ocorre por ascósporos
        presentes nos restos culturais e sob condições climáticas favoráveis
        (temperatura em torno de 25°C e molhamento foliar em torno de 10 horas)
        infecções secundárias, por conídios do patógeno são disseminados entre
        as plantas da lavoura, por meio de respingos de chuva e vento.
      </Paragraph>
    </Container>
  </ContainerSafe>
);

DiseaseInfo.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default DiseaseInfo;
