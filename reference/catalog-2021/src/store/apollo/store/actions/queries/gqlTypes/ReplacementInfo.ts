/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReplacementInfo
// ====================================================

export interface ReplacementInfo_replacementInfo {
  __typename: "ReplacementInfo";
  id: string;
  image: string | null;
  productName: string | null;
  serialNumber: string | null;
  usage: string | null;
  expires: number | null;
  catalogItemId: string | null;
  _etag: string;
}

export interface ReplacementInfo {
  replacementInfo: ReplacementInfo_replacementInfo | null;
}
