import React from 'react';
import { useTranslation } from 'react-i18next';
//import { ShareFeedbackSideSheet } from 'components';

import BottomAction from '../../components/BottomAction';

export interface ShareFeedbackContentProps {
  tenantLoading: boolean;
}

const ShareFeedbackContent: React.FC<ShareFeedbackContentProps> = ({
  tenantLoading,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  //const oboInfoLocalState = useOBOInfoLocalState();

  return (
    <>
      <BottomAction
        buttonId="shareFeedbackAction"
        title={t('home:feedback.title')}
        message={t('home:feedback.subtitle')}
        buttonLabel={t('home:feedback.action')}
        onClick={() => setIsOpen(true)}
        actionDisable={true}
        tenantLoading={tenantLoading}
      />
      {/* <ShareFeedbackSideSheet isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </>
  );
};

export default ShareFeedbackContent;
