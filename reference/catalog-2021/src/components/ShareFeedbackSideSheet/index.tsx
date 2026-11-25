import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { SideSheet } from '@lumos/core';
import { SUBMIT_FEEDBACK, FEEDBACK_CATEGORIES } from './queries';
import {
  SubmitFeedback,
  SubmitFeedbackVariables,
} from './queries/gqlTypes/SubmitFeedback';
import LoadingScreen from 'components/LoadingScreen';
import ErrorScreen from 'components/ErrorScreen';
import { FeedBackCategories } from './queries/gqlTypes/FeedBackCategories';
import ShareFeedback from './ShareFeedback';

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
 * Share Feedback Side Sheet Props
 */
interface ShareFeedbackSideSheetProps {
  isOpen: boolean;
  setIsOpen: Function;
}

/**
 * Share Feedback Side Sheet for site
 */
const ShareFeedbackSideSheet: React.FC<ShareFeedbackSideSheetProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [createFeedback, { loading, error }] = useMutation<
    SubmitFeedback,
    SubmitFeedbackVariables
  >(SUBMIT_FEEDBACK, {
    onCompleted: () => {
      setIsSuccessMessageVisible(true);
    },
  });
  const {
    data: feedbackCategoriesData,
    loading: feedbackCategoryLoading,
    error: feedbackCategoryError,
  } = useQuery<FeedBackCategories>(FEEDBACK_CATEGORIES);
  const [feedbackCategory, setFeedback] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  const createsFeedbackOrder = () => {
    createFeedback({
      variables: { category: feedbackCategory, feedbackText },
    });
  };

  const onSideSheetClose = () => {
    setIsOpen(false);
    setIsSuccessMessageVisible(false);
    setFeedbackText('');
    setFeedback('');
  };

  return (
    <SideSheet
      id="shareFeedback"
      padding={0}
      isOpen={isOpen}
      onRequestClose={onSideSheetClose}
    >
      {loading || feedbackCategoryLoading ? (
        <LoadingScreen />
      ) : feedbackCategoryError || !feedbackCategoriesData ? (
        <ErrorScreen />
      ) : (
        <ShareFeedback
          isSuccessMessageVisible={isSuccessMessageVisible}
          isSubmitButtonDisabled={
            feedbackText.length <= 0 || feedbackCategory.length <= 0
          }
          hasSubmissionError={!!error}
          feedbackCategoriesData={feedbackCategoriesData}
          feedbackText={feedbackText}
          onChangeFeedbackCategories={setFeedback}
          onChangeFeedbackText={e => setFeedbackText(e.target.value)}
          onSubmitFeedback={createsFeedbackOrder}
          onCloseFeedback={onSideSheetClose}
        />
      )}
    </SideSheet>
  );
};

export default ShareFeedbackSideSheet;
