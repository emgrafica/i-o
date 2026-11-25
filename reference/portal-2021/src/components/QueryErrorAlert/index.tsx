import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography, Grid } from '@lumos/core';
import { ErrorOutline, Replay } from '@material-ui/icons';

export interface QueryErrorAlertProps {
  errorMessage: string;
  retryClickHandler: () => void;
}

const QueryErrorAlert: React.FC<QueryErrorAlertProps> = ({
  errorMessage,
  retryClickHandler,
}) => {
  const { t } = useTranslation();
  return (
    <Grid
      flexDirection="column"
      marginTop="30px"
      alignItems="start"
      justifyContent="center"
      maxWidth="491px"
    >
      <Grid
        flexDirection="row"
        justifyContent="center"
        color="state.danger"
        paddingLeft="12px"
      >
        <ErrorOutline />
        <Typography
          kind="body2"
          color="state.danger"
          marginTop="5px"
          marginLeft="13px"
          marginBottom="24px"
        >
          {errorMessage}
        </Typography>
      </Grid>
      <Grid alignSelf="center">
        <Button
          kind="secondary"
          withIconOnLeft={<Replay />}
          onClick={() => retryClickHandler()}
        >
          {t('common:retry')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default QueryErrorAlert;
