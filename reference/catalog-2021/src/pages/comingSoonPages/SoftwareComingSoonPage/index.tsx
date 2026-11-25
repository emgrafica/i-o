import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@lumos/core';
import ComingSoonTemplate from 'components/ComingSoonTemplate';
import group1 from 'assets/images/comingSoon/group1.png';
import group1_ultra_wide from 'assets/images/comingSoon/group1_ultra_wide.png';

/**
 * Software Coming Soon page.
 */
const SoftwareComingSoonPage: React.FC = () => {
  const { t } = useTranslation();
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
      title={t('temporaryText:comingSoon.title')}
      subtitle={t('temporaryText:showWipSoftware.subtitle')}
      featureDescriptionText={
        <Typography
          kind="body1"
          fontSize={{
            xxs: '0',
            xs: '0',
            sm: '1',
          }}
        >
          {t('temporaryText:showWipSoftware.description')}
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
          {t('temporaryText:showWipSoftware.redirect')}
          <a
            href="https://example.com
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('temporaryText:showWipSoftware.redirectLink')}
          </a>
        </Typography>
      }
    />
  );
};
export default SoftwareComingSoonPage;
