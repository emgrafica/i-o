import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box } from '@lumos/core';

//This message is used for computer models that return an empty color, memory, processor, and storage for thr configurations property

const RequestDetailsNoConfigMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography kind="h5" color="primary.2">
        {t('pages:request.computers.computerDetails.selectConfiguration')}
      </Typography>

      <Typography kind="body1" color="secondary.0">
        {t('pages:request.computers.computerDetails.configurationStockMessage')}
      </Typography>
    </Box>
  );
};

export default RequestDetailsNoConfigMessage;
