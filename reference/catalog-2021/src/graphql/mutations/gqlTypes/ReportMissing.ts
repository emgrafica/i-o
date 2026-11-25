/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ReportMissing
// ====================================================

export interface ReportMissing_reportMissing {
  __typename: "AssetActionTicket";
  /**
   * Service ticket id generated
   */
  ticketId: string;
}

export interface ReportMissing {
  /**
   * Returns an asset
   */
  reportMissing: ReportMissing_reportMissing;
}

export interface ReportMissingVariables {
  assetId: string;
  requestedForId: string;
  description: string;
  caseNumber: string;
  serialNumber: string;
}
