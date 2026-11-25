/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterAssetOwnershipArgs } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: registerAssetOwnership
// ====================================================

export interface registerAssetOwnership_registerAssetOwnership {
  __typename: "AssetActionTicket";
  /**
   * Service ticket id generated
   */
  ticketId: string;
}

export interface registerAssetOwnership {
  registerAssetOwnership: registerAssetOwnership_registerAssetOwnership;
}

export interface registerAssetOwnershipVariables {
  data: RegisterAssetOwnershipArgs;
}
