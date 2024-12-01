import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import { Creators as LoginActions } from '~/store/ducks/login';
import { images } from '~/assets';
import { displayName } from '~/../package.json';
import { navigate } from '~/services/navigation';
import StyledTextInput from '~/components/StyledTextInput';

import {
  GradientContainer,
  ContainerSafe,
  Title,
  Logo,
  Button,
  FormContainer,
  ButtonText,
  FooterInstructions,
  ErrorMessage,
  FooterContainer,
  FooterLink,
  TopBar,
} from './styles';

import ValidationSchema from './formValidation';

class SignIn extends Component {
  static defaultProps = {
    errorContent: { message: '' },
  };

  static propTypes = {
    loginRequest: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    errorContent: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  };

  state = {
    email: '',
    password: '',
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    const { loginRequest } = this.props;

    loginRequest(email, password);
  };

  handleSigUp = () => {
    navigate('SignUp');
  };

  render() {
    const { error, loading, errorContent } = this.props;
    return (
      <GradientContainer>
        <ContainerSafe>
          <TopBar />
          <Logo source={images.embrapa_logo_branca} resizeMode="contain" />
          <Title>{displayName}</Title>

          <Formik
            initialValues={this.state}
            onSubmit={(values) => {
              this.setState(values);
              this.handleSubmit();
            }}
            validationSchema={ValidationSchema}
          >
            {(formikProps) => (
              <FormContainer>
                {error && errorContent && (
                  <ErrorMessage>{errorContent.message}</ErrorMessage>
                )}

                <StyledTextInput
                  formikKey="email"
                  formikProps={formikProps}
                  autoCapitalize="none"
                  autoFocus
                  value={formikProps.values.email}
                  placeholder="Email"
                />

                <StyledTextInput
                  formikKey="password"
                  formikProps={formikProps}
                  value={formikProps.values.password}
                  placeholder="Senha"
                  secureTextEntry
                />

                <Button onPress={formikProps.handleSubmit}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <ButtonText>Login</ButtonText>
                  )}
                </Button>
                <FooterContainer>
                  <FooterInstructions>
                    Ainda não tem cadastro?
                  </FooterInstructions>
                  <FooterLink onPress={this.handleSigUp}>
                    Registre-se aqui.
                  </FooterLink>
                </FooterContainer>
              </FormContainer>
            )}
          </Formik>
        </ContainerSafe>
      </GradientContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.login.error,
  loading: state.login.loading,
  errorContent: state.login.errorContent,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(LoginActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
