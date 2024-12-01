import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { ErrorMessage } from './styles';

const FieldWrapper = ({ children, formikProps, formikKey }) => (
  <>
    {children}
    {formikProps.touched[formikKey] && formikProps.errors[formikKey] && (
      <ErrorMessage>{formikProps.errors[formikKey]}</ErrorMessage>
    )}
  </>
);

FieldWrapper.propTypes = {
  formikKey: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  formikProps: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }).isRequired,
};

export default FieldWrapper;
