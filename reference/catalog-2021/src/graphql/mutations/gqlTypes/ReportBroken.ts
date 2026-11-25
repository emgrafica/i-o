/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReportBrokenArgs } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: ReportBroken
// ====================================================

export interface ReportBroken_reportBroken {
  __typename: "AssetActionTicket";
  /**
   * Service ticket id generated
   */
  ticketId: string;
}

export interface ReportBroken {
  reportBroken: ReportBroken_reportBroken;
}

export interface ReportBrokenVariables {
  data: ReportBrokenArgs;
}
