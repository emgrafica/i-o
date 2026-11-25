import React from 'react';
import PageTitle from 'components/PageTitle';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@lumos/core';
import GenericError from 'components/GenericError';
import { SettingsRounded } from '@material-ui/icons';

const MaintenancePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Grid
      minHeight="100%"
      flexDirection="column"
      paddingY="100px"
      backgroundColor="secondary.4"
    >
      <PageTitle title={t('maintenance:title')} />

      <GenericError>
        <Typography
          kind="h1"
          color="state.warning"
          textAlign="center"
          marginTop={6}
          marginBottom={0}
        >
          <SettingsRounded fontSize="inherit" />
        </Typography>
        <Typography kind="h4" color="secondary.2" textAlign="center">
          {t('maintenance:header')}
        </Typography>
        <Typography
          kind="h6"
          color="secondary.1"
          textAlign="center"
          marginTop={4}
        >
          {t('maintenance:message')}
        </Typography>
      </GenericError>
    </Grid>
  );
};

export default MaintenancePage;
