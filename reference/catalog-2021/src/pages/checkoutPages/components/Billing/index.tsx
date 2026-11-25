import React from 'react';
import { Box, Typography } from '@lumos/core';
import SkeletonBilling from './SkeletonBilling';
import SectionHeader from 'components/SectionHeader';
import { useTranslation } from 'react-i18next';

interface BillingProps {
  isLoading: boolean;
  billingText: string;
}

/**
 *  Billing component
 */
const Billing: React.FC<BillingProps> = ({ isLoading, billingText }) => {
  const { t } = useTranslation();
  return (
    <Box marginBottom="30px">
      <SectionHeader title={t('common:billing')} />
      {isLoading ? (
        <Typography m={0} kind="body2">
          <SkeletonBilling />
        </Typography>
      ) : (
        <Typography m={0} kind="body2">
          {billingText}
        </Typography>
      )}
    </Box>
  );
};

export default Billing;
