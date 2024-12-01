import React from 'react';
import PropTypes from 'prop-types';

import { SwitchComponent, SwitchContainer, SwitchLabel } from './styles';
import FieldWrapper from '~/components/FieldWrapper';

const StyledSwitch = ({
  formikKey, formikProps, label, ...rest
}) => (
  <FieldWrapper formikKey={formikKey} formikProps={formikProps}>
    <SwitchContainer>
      <SwitchLabel>{label}</SwitchLabel>
      <SwitchComponent
        value={formikProps.values[formikKey]}
        onValueChange={(value) => {
          formikProps.setFieldValue(formikKey, value);
        }}
        {...rest}
      />
    </SwitchContainer>
  </FieldWrapper>
);

StyledSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  formikKey: PropTypes.string.isRequired,
  formikProps: PropTypes.shape({
    touched: PropTypes.shape({}),
    errors: PropTypes.shape({}),
  }).isRequired,
};

export default StyledSwitch;
