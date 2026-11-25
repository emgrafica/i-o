/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubmitFeedback
// ====================================================

export interface SubmitFeedback_submitFeedback {
  __typename: "SubmitFeedbackResponse";
  /**
   * The unique identifier of the feedback entry
   */
  feedbackId: string;
}

export interface SubmitFeedback {
  submitFeedback: SubmitFeedback_submitFeedback;
}

export interface SubmitFeedbackVariables {
  category: string;
  feedbackText: string;
}
