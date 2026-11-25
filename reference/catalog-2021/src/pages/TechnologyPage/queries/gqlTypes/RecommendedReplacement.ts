/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: RecommendedReplacement
// ====================================================

export interface RecommendedReplacement_recommendedReplacement {
  __typename: "ReplacementCatalogItem";
  catalogItemImage: string | null;
  catalogItemName: string;
  model: string | null;
}

export interface RecommendedReplacement {
  recommendedReplacement: RecommendedReplacement_recommendedReplacement | null;
}

export interface RecommendedReplacementVariables {
  assetId: string;
}
