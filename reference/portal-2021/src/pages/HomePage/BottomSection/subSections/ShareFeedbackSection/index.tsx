import React from 'react';
import { StyledWhiteBox } from '../../../general.style';
import ShareFeedbackContent from './ShareFeedbackContent';

export interface ShareFeedbackSectionProps {
  tenantLoading: boolean;
}

const ShareFeedbackSection: React.FC<ShareFeedbackSectionProps> = ({
  tenantLoading,
}) => {
  return (
    <StyledWhiteBox height={200}>
      <ShareFeedbackContent tenantLoading={tenantLoading} />
    </StyledWhiteBox>
  );
};

export default ShareFeedbackSection;
