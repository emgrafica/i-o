/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReassignAssetInput } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: reassignAsset
// ====================================================

export interface reassignAsset_reassignAsset {
  __typename: "AssetActionTicket";
  /**
   * Service ticket id generated
   */
  ticketId: string;
}

export interface reassignAsset {
  /**
   * Reassigns an asset to another user. This is not guaranteed to take effect
   * immediately. For instance, some tenants create workflow tasks to handle the reassignment.
   *  If the ticket info is empty, then it's safe to assume the asset was updated without any workflows.
   */
  reassignAsset: reassignAsset_reassignAsset;
}

export interface reassignAssetVariables {
  data: ReassignAssetInput;
}
