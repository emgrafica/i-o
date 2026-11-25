import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Typography } from '@lumos/core';
import ComingSoonTemplate from 'components/ComingSoonTemplate';
import group3 from 'assets/images/comingSoon/group3.png';
import group3_ultra_wide from 'assets/images/comingSoon/group3_ultra_wide.png';

/**
 * Approvals Coming Soon page.
 */
const ApprovalsComingSoonPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ComingSoonTemplate
      backgroundImage={{
        xxs: `url(${group3})`,
        xs: `url(${group3})`,
        sm: `url(${group3})`,
        md: `url(${group3})`,
        lg: `url(${group3})`,
        xl: `url(${group3})`,
        xxl: `url(${group3_ultra_wide})`,
      }}
      backgroundPosition="right"
      title={t('temporaryText:showWipApprovals.title')}
      subtitle={t('temporaryText:showWipApprovals.subtitle')}
      featureDescriptionText={
        <Typography
          kind="body1"
          fontSize={{
            xxs: '0',
            xs: '0',
            sm: '1',
          }}
        >
          {t('temporaryText:showWipApprovals.content1')}
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
          <Trans t={t} i18nKey="temporaryText:showWipApprovals.content2">
            Need to approve an open order now?
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Visit existing i-o My Actions.
            </a>
          </Trans>
        </Typography>
      }
    />
  );
};

export default ApprovalsComingSoonPage;
