import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Typography } from '@lumos/core';
import ComingSoonTemplate from 'components/ComingSoonTemplate';
import group1 from 'assets/images/comingSoon/group1.png';
import group1_ultra_wide from 'assets/images/comingSoon/group1_ultra_wide.png';

/**
 * Computers Coming Soon page.
 */
const ComputersComingSoonPage: React.FC = () => {
  const { t } = useTranslation('temporaryText');

  return (
    <ComingSoonTemplate
      backgroundImage={{
        xxs: `url(${group1})`,
        xs: `url(${group1})`,
        sm: `url(${group1})`,
        md: `url(${group1})`,
        lg: `url(${group1})`,
        xl: `url(${group1})`,
        xxl: `url(${group1_ultra_wide})`,
      }}
      backgroundPosition="center"
      title={t('showWipComputers.title')}
      subtitle={t('showWipComputers.subtitle')}
      featureDescriptionText={
        <Typography
          kind="body1"
          fontSize={{
            xxs: '0',
            xs: '0',
            sm: '1',
          }}
        >
          {t('showWipComputers.content1')}
        </Typography>
      }
      redirectActionComponent={
        <Typography
          kind="body1"
          fontSize={{
            xxs: '0',
            xs: '0',
            sm: '1',
          }}
        >
          <Trans t={t} i18nKey="showWipComputers.content2">
            Need a computer now?
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              {'Visit existing i-o Computers Catalog'}
            </a>
          </Trans>
        </Typography>
      }
    />
  );
};

export default ComputersComingSoonPage;
