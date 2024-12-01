import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as LogoutActions } from '~/store/ducks/logout';

import { Container, Button, ButtonImage } from './styles';

class LogoutButton extends Component {
  static propTypes = {
    logoutRequest: PropTypes.func.isRequired,
  };

  handleLogout = () => {
    const { logoutRequest } = this.props;
    logoutRequest();
  };

  render() {
    return (
      <Container>
        <Button onPress={this.handleLogout}>
          <ButtonImage />
        </Button>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(LogoutActions, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(LogoutButton);
