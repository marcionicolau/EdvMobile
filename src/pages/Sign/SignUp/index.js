import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import { Creators as UsersActions } from '~/store/ducks/users';
import { images } from '~/assets';
import { displayName } from '~/../package.json';
import { navigate } from '~/services/navigation';
import StyledTextInput from '~/components/StyledTextInput';
import StyledSwitch from '~/components/StyledSwitch';

import {
  ContainerSafe,
  GradientContainer,
  Title,
  TopBar,
  Logo,
  FooterContainer,
  FormContainer,
  ErrorMessage,
  Button,
  FooterInstructions,
  FooterLink,
  ButtonText,
} from './styles';

import ValidationSchema from './formValidation';

const SignUp = class SignUp extends Component {
  static defaultProps = {
    errorContent: { message: '' },
  };

  static propTypes = {
    createUserRequest: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    errorContent: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  };

  state = {
    fullname: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  handleSubmit = () => {
    const {
      fullname, email, password, passwordConfirmation,
    } = this.state;
    const { createUserRequest } = this.props;

    createUserRequest(fullname, email, password, passwordConfirmation);
  };

  handleSigIn = () => {
    navigate('SignIn');
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
            initialValues={{
              ...this.state,
              agreeToTerms: false,
            }}
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
                  formikKey="fullname"
                  formikProps={formikProps}
                  autoCorrect={false}
                  autoFocus
                  placeholder="Nome Completo"
                  value={formikProps.values.fullname}
                />

                <StyledTextInput
                  formikKey="email"
                  formikProps={formikProps}
                  autoCapitalize="none"
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

                <StyledTextInput
                  formikKey="passwordConfirmation"
                  formikProps={formikProps}
                  value={formikProps.values.passwordConfirmation}
                  placeholder="Confirma Senha"
                  secureTextEntry
                />

                <StyledSwitch
                  label="Aceito os termos e condições de uso"
                  formikKey="agreeToTerms"
                  formikProps={formikProps}
                />

                <Button onPress={formikProps.handleSubmit}>
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <ButtonText>Cadastrar</ButtonText>
                  )}
                </Button>

                <FooterContainer>
                  <FooterInstructions>Já tem cadastro?</FooterInstructions>
                  <FooterLink onPress={this.handleSigIn}>
                    Acesse aqui.
                  </FooterLink>
                </FooterContainer>
              </FormContainer>
            )}
          </Formik>
        </ContainerSafe>
      </GradientContainer>
    );
  }
};

const mapStateToProps = (state) => ({
  error: state.users.error,
  loading: state.users.loading,
  errorContent: state.users.errorContent,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
