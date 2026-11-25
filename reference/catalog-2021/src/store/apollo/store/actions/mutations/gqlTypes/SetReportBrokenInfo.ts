/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReportBrokenInput } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: SetReportBrokenInfo
// ====================================================

export interface SetReportBrokenInfo_setReportBrokenInfo {
  __typename: "ReportBrokenInfo";
  id: string;
}

export interface SetReportBrokenInfo {
  setReportBrokenInfo: SetReportBrokenInfo_setReportBrokenInfo | null;
}

export interface SetReportBrokenInfoVariables {
  reportBrokenInput?: ReportBrokenInput | null;
}
