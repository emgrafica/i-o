import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTitle from 'components/PageTitle';
import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';
import { Box } from '@lumos/core';

/**
 * Get Support Page
 */
const GetSupportPage: React.FC = () => {
  const { t } = useTranslation('getSupport');

  return (
    <>
      <Box height="100%">
        <PageTitle title={t('title')} />
        <TopSection />
        <MiddleSection />
        <BottomSection />
      </Box>
    </>
  );
};

export default GetSupportPage;
