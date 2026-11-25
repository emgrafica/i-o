/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AssetType } from '../../../models/globalTypes';

// ====================================================
// GraphQL query operation: AssetActionVariation
// ====================================================

export interface AssetActionVariation_assetActionVariation {
  __typename: 'AssetActionVariationResult';
  /**
   * Variation that applies for a specified action
   */
  variation: string;
}

export interface AssetActionVariation {
  /**
   * Returns the action variation that applies to a given asset for a user.
   */
  assetActionVariation: AssetActionVariation_assetActionVariation;
}

export interface AssetActionVariationVariables {
  assetId: string;
  action: string;
  assetType: AssetType;
}
