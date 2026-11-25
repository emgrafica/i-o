import React from 'react';
import { Grid, Typography, Form } from '@lumos/core';
import { ErrorRounded } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { StyledFormCheckbox } from 'components/StyledFormCheckbox';
import { OverrideElementBox } from '../components.style';

interface FormValidationOverrideProps {
  // Controls Form.Checkbox checked state
  checked: boolean;
  // Checkbox change handler
  onChange: () => void;
  // Site's shipping carrier
  carrier: string;
}

// Element to override shipping form validation
const FormValidationOverride: React.FC<FormValidationOverrideProps> = ({
  checked,
  onChange,
  carrier,
}) => {
  const { t } = useTranslation('checkout');
  return (
    <Grid
      marginTop={{ xxs: '5px', md: '8px', lg: '70px' }}
      flexDirection="column"
    >
      <Grid
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        marginBottom="12px"
      >
        <ErrorRounded color="error" />
        <Typography kind="subtitle1" fontSize="18px" marginLeft="12px">
          {`${carrier || `Carrier`} ${t('validationOverride.carrier.message')}`}
        </Typography>
      </Grid>
      <OverrideElementBox>
        <Typography
          kind="body1"
          paddingLeft="12px"
          paddingRight="12px"
          marginBottom="32px"
        >
          {t('validationOverride.message')}
        </Typography>
        <StyledFormCheckbox
          inlineLabel
          label={t('validationOverride.label')}
          htmlFor="override-validation"
          paddingBottom="22px"
          required
        >
          <Form.Checkbox
            id="override-validation"
            checked={checked}
            onChange={onChange}
          />
        </StyledFormCheckbox>
      </OverrideElementBox>
    </Grid>
  );
};

export default FormValidationOverride;
