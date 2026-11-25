/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductInfo } from "./../../../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: SetReplacementInfo
// ====================================================

export interface SetReplacementInfo_setReplacementInfo {
  __typename: "ReplacementInfo";
  id: string;
}

export interface SetReplacementInfo {
  setReplacementInfo: SetReplacementInfo_setReplacementInfo | null;
}

export interface SetReplacementInfoVariables {
  productInfo?: ProductInfo | null;
}
