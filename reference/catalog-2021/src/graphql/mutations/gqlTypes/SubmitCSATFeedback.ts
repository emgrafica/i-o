/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogItemClass } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: SubmitCSATFeedback
// ====================================================

export interface SubmitCSATFeedback_submitCSATFeedback {
  __typename: "SubmitFeedbackResponse";
  /**
   * The unique identifier of the feedback entry
   */
  feedbackId: string;
  /**
   * The EPOCH time that the feedback was submitted
   */
  timestamp: string;
}

export interface SubmitCSATFeedback {
  submitCSATFeedback: SubmitCSATFeedback_submitCSATFeedback;
}

export interface SubmitCSATFeedbackVariables {
  ticketId: string;
  catalogClass: CatalogItemClass;
  experienceRating: number;
  productHelpfulness: string;
  feedback?: string | null;
}
