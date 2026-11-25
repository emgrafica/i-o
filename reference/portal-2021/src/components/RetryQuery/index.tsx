import React from 'react';
import { Grid, Button, Typography } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import { ReportProblemOutlined, Refresh } from '@material-ui/icons';

interface RetryQueryProps {
  /**
   * @abstract
   * @desc
   *  Implement this function to trigger retry
   */
  onRetry: () => void;
}

//Fixme - run i18n
const RetryQuery: React.FC<RetryQueryProps> = ({ onRetry }) => {
  const { t } = useTranslation('retryQuery');
  return (
    <Grid
      marginTop="100px"
      marginRight="0"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid
        maxWidth="556px"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography kind="h5" color="state.danger" width="100%">
          <ReportProblemOutlined /> {t('message')}
        </Typography>
        <Button
          kind="secondary"
          withIconOnLeft={<Refresh />}
          onClick={onRetry}
          marginTop="40px"
        >
          {t('retry')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default RetryQuery;
