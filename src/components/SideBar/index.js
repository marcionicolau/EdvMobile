import React from 'react';
import PropTypes from 'prop-types';
import { version, displayName } from '~/../package.json';

import {
  ContainerSafe,
  TopBar,
  Title,
  TopArea,
  TopLogo,
  BottomArea,
  LinkArea,
  DrawerArea,
  BottomTextDescription,
  BottomTextVersion,
} from './styles';

const SideBar = (props) => (
  <ContainerSafe>
    <TopBar />
    <TopArea>
      <TopLogo />
      <Title>Trigo</Title>
    </TopArea>
    <DrawerArea>
      <LinkArea {...props} />
    </DrawerArea>
    <BottomArea>
      <BottomTextDescription>{displayName}</BottomTextDescription>
      <BottomTextVersion>{version}</BottomTextVersion>
    </BottomArea>
  </ContainerSafe>
);

SideBar.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SideBar;
