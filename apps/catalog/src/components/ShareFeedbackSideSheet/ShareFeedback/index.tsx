import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@lumos/core';
import FeedbackHeader from './FeedbackHeader';
import FeedbackMessage from './FeedbackMessage';
import FeedbackForm from './FeedbackForm';
import { FeedBackCategories } from '../queries/gqlTypes/FeedBackCategories';
import { StyledCloseButtonContainer } from './index.style';

/**
 * parseFeedbackOptions parse feedbackCategoriesData to dropdown options
 */
export const parseFeedbackOptions = (
  feedbackCategoriesData: FeedBackCategories | undefined,
) =>
  feedbackCategoriesData
    ? feedbackCategoriesData.feedbackCategories.map((category: string) => ({
        label: category,
        value: category,
      }))
    : [];

/**
 * Share Feedback content Props
 */
interface ShareFeedbackProps {
  /**
   * isSuccessMessageVisible display Message if feedback was submitted successfully.
   */
  isSuccessMessageVisible: boolean;

  /**
   * isSubmitButtonDisabled disabled submit button.
   */
  isSubmitButtonDisabled: boolean;

  /**
   * hasSubmissionError display error message if submit feedback failed.
   */
  hasSubmissionError: boolean;

  /**
   * feedbackCategoriesData feedback categories to display as options.
   */
  feedbackCategoriesData: FeedBackCategories | undefined;

  /**
   * onChangeFeedbackCategories triggered when a category is selected.
   */
  onChangeFeedbackCategories: (selectedItem: any) => void;

  /**
   * onChangeFeedbackText triggered when the feedback text change.
   */
  onChangeFeedbackText: (e: any) => void;

  /**
   * onSubmitFeedback triggered when submit button is pressed.
   */
  onSubmitFeedback: () => void;

  /**
   * onCloseFeedback triggered when close button is pressed.
   */
  onCloseFeedback: () => void;

  /**
   * The current text within the feedback form
   */
  feedbackText: string;
}

/**
 * Share Feedback content for site
 */
const ShareFeedback: React.FC<ShareFeedbackProps> = ({
  isSuccessMessageVisible,
  isSubmitButtonDisabled,
  hasSubmissionError,
  feedbackCategoriesData,
  onChangeFeedbackCategories,
  onChangeFeedbackText,
  onSubmitFeedback,
  onCloseFeedback,
  feedbackText,
}) => {
  // Use Translations
  const { t } = useTranslation();

  return (
    <>
      <FeedbackHeader title={t('globalFeedback:title')} />
      <FeedbackMessage
        title={
          isSuccessMessageVisible
            ? t('globalFeedback:successTitle')
            : t('globalFeedback:subtitle')
        }
        message={
          isSuccessMessageVisible
            ? t('globalFeedback:successMessage')
            : t('globalFeedback:message')
        }
        disclaimer={
          isSuccessMessageVisible ? '' : t('globalFeedback:disclaimer')
        }
      />
      {isSuccessMessageVisible ? (
        <StyledCloseButtonContainer>
          <Button
            id="successFeedbackClose"
            kind="primary"
            onClick={onCloseFeedback}
          >
            {t('common:close')}
          </Button>
        </StyledCloseButtonContainer>
      ) : (
        <FeedbackForm
          options={parseFeedbackOptions(feedbackCategoriesData)}
          onChangeOptions={onChangeFeedbackCategories}
          onChangeTextArea={onChangeFeedbackText}
          onClick={onSubmitFeedback}
          disabled={isSubmitButtonDisabled}
          hasSubmissionError={!!hasSubmissionError}
          feedbackText={feedbackText}
        />
      )}
    </>
  );
};

export default ShareFeedback;
