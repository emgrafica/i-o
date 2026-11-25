import React from 'react';
import { useTranslation } from 'react-i18next';
import ComingSoonPageTemplate from 'components/ComingSoonTemplate';
import group1 from 'assets/images/comingSoon/group1.png';
import group1_ultra_wide from 'assets/images/comingSoon/group1_ultra_wide.png';
import teamsImg from 'assets/images/comingSoon/teams.png';

const CollaborationComingSoonPage = () => {
  const { t } = useTranslation('temporaryText');
  return (
    <ComingSoonPageTemplate
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
      title={t('showWipCollaboration.title')}
      subtitle={t('showWipCollaboration.description')}
      showDownloadableContent
      downloadContentImage={teamsImg}
    />
  );
};

export default CollaborationComingSoonPage;
