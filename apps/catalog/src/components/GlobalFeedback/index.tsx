import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@lumos/core';
import ShareFeedbackSideSheet from '../ShareFeedbackSideSheet';
import {
  useOBOInfoLocalState,
  SHARE_FEEDBACK_FEATURE_CODE,
} from 'store/apollo/store/hooks';
import { VerticalBox, FeedBackButton } from './general.style';

/**
 * Global Feedback props
 */
interface GlobalFeedbackProps {
  showFeedback: boolean;
}

/**
 * Global Feedback for site
 */
const GlobalFeedback: React.FC<GlobalFeedbackProps> = ({ showFeedback }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const oboInfoLocalState = useOBOInfoLocalState();
  const { t } = useTranslation();
  return (
    <>
      <ShareFeedbackSideSheet isOpen={isOpen} setIsOpen={setIsOpen} />

      {/*Button that Opens SideSheet  */}
      <VerticalBox
        top="62%"
        right="0"
        position="fixed"
        display={showFeedback ? 'unset' : 'none'}
      >
        <Box top="103%" right="0" position="absolute">
          <FeedBackButton
            fontWeight="bold"
            height={{ xl: '45px', xxl: '45' }}
            width={{ xl: '119px', xxl: '120' }}
            textTransform="capitalize"
            margin={0}
            disabled={
              !oboInfoLocalState.hasOBOUserRightFor(SHARE_FEEDBACK_FEATURE_CODE)
            }
            onClick={() => setIsOpen(true)}
            id="feedback"
          >
            {t('home:feedbackButton.label')}
          </FeedBackButton>
        </Box>
      </VerticalBox>
    </>
  );
};

export default GlobalFeedback;
