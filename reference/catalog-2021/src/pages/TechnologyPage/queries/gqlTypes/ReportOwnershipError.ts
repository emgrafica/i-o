/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReportOwnershipErrorArgs } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: ReportOwnershipError
// ====================================================

export interface ReportOwnershipError_reportOwnershipError {
  __typename: "AssetActionTicket";
  /**
   * Service ticket id generated
   */
  ticketId: string;
}

export interface ReportOwnershipError {
  reportOwnershipError: ReportOwnershipError_reportOwnershipError;
}

export interface ReportOwnershipErrorVariables {
  data: ReportOwnershipErrorArgs;
}
