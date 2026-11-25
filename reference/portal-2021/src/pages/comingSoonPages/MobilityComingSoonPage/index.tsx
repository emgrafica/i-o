import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@lumos/core';
import ComingSoonTemplate from 'components/ComingSoonTemplate';
import group2 from 'assets/images/comingSoon/group2.png';
import group2_ultra_wide from 'assets/images/comingSoon/group2_ultra_wide.png';

/**
 * Mobility Coming Soon page.
 */
const MobilityComingSoonPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <ComingSoonTemplate
      backgroundImage={{
        xxs: `url(${group2_ultra_wide})`,
        xs: `url(${group2_ultra_wide})`,
        sm: `url(${group2_ultra_wide})`,
        md: `url(${group2_ultra_wide})`,
        lg: `url(${group2})`,
        xl: `url(${group2})`,
        xxl: `url(${group2_ultra_wide})`,
      }}
      backgroundPosition="center"
      title={t('temporaryText:comingSoon.title')}
      subtitle={t('temporaryText:showWipMobility.subtitle')}
      featureDescriptionText={
        <Typography
          kind="body1"
          fontSize={{
            xxs: '0',
            xs: '0',
            sm: '1',
          }}
        >
          {t('temporaryText:showWipMobility.description')}
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
          {t('temporaryText:showWipMobility.redirect')}
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('temporaryText:showWipMobility.redirectLink')}
          </a>
        </Typography>
      }
    />
  );
};
export default MobilityComingSoonPage;
