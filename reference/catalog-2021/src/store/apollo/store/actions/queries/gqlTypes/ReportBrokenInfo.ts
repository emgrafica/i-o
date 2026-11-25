/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReportBrokenInfo
// ====================================================

export interface ReportBrokenInfo_reportBrokenInfo {
  __typename: "ReportBrokenInfo";
  id: string;
  image: string | null;
  productName: string | null;
  serialNumber: string | null;
  usage: string | null;
  expires: number | null;
  catalogItemId: string;
  incidentNumber: string;
  details: string;
  _etag: string;
}

export interface ReportBrokenInfo {
  reportBrokenInfo: ReportBrokenInfo_reportBrokenInfo | null;
}
