/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReportOwnershipErrorContent
// ====================================================

export interface GetReportOwnershipErrorContent_reportOwnershipErrorGlobal_questions_options {
  __typename: 'Option';
  label: string;
  value: string;
}

export interface GetReportOwnershipErrorContent_reportOwnershipErrorGlobal_questions {
  __typename: 'Question';
  id: string;
  label: string;
  options: GetReportOwnershipErrorContent_reportOwnershipErrorGlobal_questions_options[];
}

export interface GetReportOwnershipErrorContent_reportOwnershipErrorGlobal {
  __typename: 'ReportOwnershipErrorGlobal';
  questions: GetReportOwnershipErrorContent_reportOwnershipErrorGlobal_questions[];
}

export interface GetReportOwnershipErrorContent {
  reportOwnershipErrorGlobal: GetReportOwnershipErrorContent_reportOwnershipErrorGlobal;
}
