import React from 'react';
import PageTitle from 'components/PageTitle';
import { useTranslation } from 'react-i18next';
import { Box } from '@lumos/core';
import MainSection from './MainSection';
import TechnologySection from './TechnologySection';
import BottomSection from './BottomSection';

/**
 * Home page.
 */
const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box flexDirection="column" width="100%">
      <PageTitle title={t('home:title')} />

      {/* Top Section */}
      <MainSection />

      {/* Middle Section */}
      <TechnologySection />

      {/* Bottom Section */}
      <BottomSection />
    </Box>
  );
};

export default HomePage;
