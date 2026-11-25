import React from 'react';
import { Button, Form, Grid } from '@lumos/core';
import { useTranslation } from 'react-i18next';
import {
  StyledSubmissionErrorBox,
  StyledSubmissionErrorGrid,
  StyledIconGrid,
  StyledWarningIcon,
  StyledTypography,
} from './index.style';
const MAX_CHARACTERS = 500;

interface FeedbackFormProps {
  /**
   * Handles category changes
   */
  onChangeOptions: (selectedItem: any) => void;
  /**
   * Handles Change for Feedback Text area
   */
  onChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /**
   * Feedback Categories
   */
  options: { label: string; value: string }[];
  /**
   * Handles mutation on submit
   */
  onClick: React.MouseEventHandler<HTMLElement>;
  /**
   * Disables buttons if categories aren't selected
   */
  disabled: boolean;
  /**
   * Indicates if there was an error submitting the form
   */
  hasSubmissionError: boolean;
  /**
   * The current text within the feedback form
   */
  feedbackText: string;
}

/**
 *
 * Global Share Feedback form
 */
const FeedbackForm: React.FC<FeedbackFormProps> = props => {
  // Use Translations
  const { t } = useTranslation();

  return (
    <>
      {/* Feedback Dropdown selection */}
      <Form padding={4} name="feedbackForm">
        <Form.Item
          required
          htmlFor="feedbackOptionsDropdown"
          label={t('globalFeedback:dropdownFeedback')}
          labelId="feedbackOptionsLabelId"
        >
          <Form.Dropdown
            id="feedbackOptionsDropdown"
            aria-label="Feedback Options"
            aria-labelledby="feedbackOptionsLabelId"
            buttonLabel={t('globalFeedback:pleaseSelect')}
            onChange={props.onChangeOptions}
            options={props.options}
          />
        </Form.Item>

        {/* Feedback input */}
        <Form.Item
          required
          htmlFor="shareFeedbackText"
          label={t('globalFeedback:inputFeedback')}
        >
          <Form.TextArea
            id="shareFeedbackText"
            name="shareFeedbackText"
            maximum={MAX_CHARACTERS}
            maxLength={MAX_CHARACTERS}
            placeholder={t('globalFeedback:feedbackPlaceholder')}
            onChange={props.onChangeTextArea}
            value={props.feedbackText}
          />
        </Form.Item>
      </Form>

      {/* Submission Error display */}
      {props.hasSubmissionError && (
        <StyledSubmissionErrorBox>
          <StyledSubmissionErrorGrid>
            <StyledIconGrid>
              <StyledWarningIcon />
            </StyledIconGrid>
            <StyledTypography kind="body1">
              {t('globalFeedback:submissionError')}
            </StyledTypography>
          </StyledSubmissionErrorGrid>
        </StyledSubmissionErrorBox>
      )}

      {/* Submit Button for mutation */}
      <Grid paddingTop={6} justifyContent="flex-end" px={3}>
        <Button
          kind="primary"
          disabled={props.disabled}
          onClick={props.onClick}
          id="submitFeedback"
        >
          {t('globalFeedback:submit')}
        </Button>
      </Grid>
    </>
  );
};

export default FeedbackForm;
