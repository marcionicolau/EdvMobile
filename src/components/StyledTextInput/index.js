import React from 'react';
import PropTypes from 'prop-types';
import FieldWrapper from '~/components/FieldWrapper';
import { Input } from './styles';

const StyledTextInput = ({ formikKey, formikProps, ...rest }) => (
  <FieldWrapper formikKey={formikKey} formikProps={formikProps}>
    <Input
      onChangeText={formikProps.handleChange(formikKey)}
      onBlur={formikProps.handleBlur(formikKey)}
      error={
        !!(formikProps.touched[formikKey] && formikProps.errors[formikKey])
      }
      {...rest}
    />
  </FieldWrapper>
);

StyledTextInput.propTypes = {
  formikKey: PropTypes.string.isRequired,
  formikProps: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }).isRequired,
};

export default StyledTextInput;
