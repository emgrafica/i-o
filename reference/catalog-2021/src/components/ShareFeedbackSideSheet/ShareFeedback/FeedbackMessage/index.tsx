import React from 'react';
import {
  StyledShareFeedbackContainer,
  StyledShareFeedbackTitle,
  StyledShareFeedbackMessage,
  StyledShareFeedbackDisclaimer,
} from './index.style';

interface FeedbackMessageProps {
  /**
   * Title for success message
   */
  title: string;
  /**
   * Description for success message
   */
  message: string;
  /**
   * Description for disclaimer
   */
  disclaimer: string;
}

/**
 *
 * Global Share Feedback Introduction Message
 */
const FeedbackMessage: React.FC<FeedbackMessageProps> = props => {
  return (
    <StyledShareFeedbackContainer>
      <StyledShareFeedbackTitle>{props.title}</StyledShareFeedbackTitle>
      <StyledShareFeedbackMessage>{props.message}</StyledShareFeedbackMessage>
      <StyledShareFeedbackDisclaimer>
        {props.disclaimer}
      </StyledShareFeedbackDisclaimer>
    </StyledShareFeedbackContainer>
  );
};

export default FeedbackMessage;
