import React from 'react';
import { useTranslation } from 'react-i18next';
import PageTitle from 'components/PageTitle';
import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import { Box, Typography } from '@lumos/core';
import { HomePath } from 'utils/routes';

/**
 * Get Support Page
 */
const GetSupportPage: React.FC = () => {
  const { t } = useTranslation('getSupport');
  const topContent = (
    <Typography
      id="pageTitle"
      kind="h1"
      fontWeight="bold"
      fontSize={{ xxs: 3, md: 7 }}
      marginTop={{ xxs: '12px', md: '33px' }}
      marginBottom={0}
      color="grayScale.0"
    >
      Support Center
    </Typography>
  );
  return (
    <>
      <Box
        backgroundImage="linear-gradient(90deg, rgb(95, 36, 159), rgb(19, 226, 218))"
        backgroundSize={{ xxs: 'cover', xxl: 'cover' }}
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundColor="#FFFFFF"
        justifyContent="center"
      >
        <PageTitle title={t('title')} />
        {/* // Start: branding Michael feedback */}
        {/* <TopSection>{topContent}</TopSection> */}
      </Box>
      <MiddleSection />
    </>
  );
};

export default GetSupportPage;
