import React from 'react';
import { Typography } from '@lumos/core';
import { useTranslation } from 'react-i18next';

const NoResultsMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Typography marginTop="50px" kind="body2" fontWeight="bold">
      {t('getSupportSearch:noResults')}
    </Typography>
  );
};

export default NoResultsMessage;
