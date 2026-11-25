import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Typography } from '@lumos/core';
import ComingSoonTemplate from 'components/ComingSoonTemplate';
import group2 from 'assets/images/comingSoon/group2.png';
import group2_ultra_wide from 'assets/images/comingSoon/group2_ultra_wide.png';

/**
 * GCom Coming Soon page.
 */
const GComComingSoonPage: React.FC = () => {
  const { t } = useTranslation('temporaryText');
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
      title={t('comingSoon.title')}
      subtitle={t('showWipGcom.subtitle')}
      featureDescriptionText={
        <Typography
          kind="body1"
          fontSize={{
            xxs: '0',
            xs: '0',
            sm: '1',
          }}
        >
          {t('showWipGcom.content1')}
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
          <Trans t={t} i18nKey="showWipGcom.content2">
            Need GCom now?
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Visit existing i-o Collaboration Catalog.
            </a>
          </Trans>
        </Typography>
      }
    />
  );
};
export default GComComingSoonPage;
