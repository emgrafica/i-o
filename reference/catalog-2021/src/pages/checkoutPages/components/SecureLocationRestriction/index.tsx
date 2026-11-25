import React from 'react';
import { Grid, Typography } from '@lumos/core';
import { Warning } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { OverrideElementBox } from '../components.style';

interface SecureLocationRestrictionProps {
  // Site's shipping carrier
  message: string;
}

// Component to display Location restriction message
const SecureLocationRestriction: React.FC<SecureLocationRestrictionProps> = ({
  message,
}) => {
  const { t } = useTranslation('checkout');
  return (
    <Grid
      flexDirection="column"
      position={{ md: 'absolute' }}
      bottom={{ md: '60px' }}
    >
      <Grid
        flexDirection="row"
        justifyContent="flex-start"
        alignItems="center"
        marginBottom="12px"
      >
        <Warning color="error" />
        <Typography
          kind="subtitle3"
          fontSize="18px"
          color="secondary.0"
          marginLeft="12px"
        >
          {t('secureLocationRestriction.message')}
        </Typography>
      </Grid>
      <OverrideElementBox>
        <Typography
          kind="body1"
          paddingLeft="12px"
          paddingRight="12px"
          marginBottom="32px"
        >
          {message}
        </Typography>
      </OverrideElementBox>
    </Grid>
  );
};
export default SecureLocationRestriction;
