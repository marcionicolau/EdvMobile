import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, ToogleButton, ToogleButtonImage } from './styles';

export default class NavigationDrawerStructure extends Component {
  static propTypes = {
    navigationProps: PropTypes.shape({
      toogleDrawer: PropTypes.func,
    }).isRequired,
  };

  toggleDrawer = () => {
    const { navigationProps } = this.props;
    navigationProps.toggleDrawer();
  };

  render() {
    return (
      <Container>
        <ToogleButton onPress={this.toggleDrawer}>
          <ToogleButtonImage />
        </ToogleButton>
      </Container>
    );
  }
}
