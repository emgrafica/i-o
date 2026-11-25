import React from 'react';
import {
  StyledShareFeedbackIcon,
  StyledShareFeedbackTitle,
  StyledShareFeedbackContainer,
} from './index.style';

interface FeedbackHeaderProps {
  /**
   * Title for Header
   */
  title: string;
}

/**
 *
 * Global share Feedback blue header
 */
const FeedbackHeader: React.FC<FeedbackHeaderProps> = ({ title }) => {
  return (
    <StyledShareFeedbackContainer>
      <StyledShareFeedbackIcon />
      <StyledShareFeedbackTitle>{title}</StyledShareFeedbackTitle>
    </StyledShareFeedbackContainer>
  );
};

export default FeedbackHeader;
