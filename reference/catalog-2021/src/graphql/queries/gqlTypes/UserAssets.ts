/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserAssets
// ====================================================

export interface UserAssets_assets_catalogItem {
  __typename: "AssetCatalogItemDetails";
  /**
   * Name of the catalog item
   */
  name: string;
}

export interface UserAssets_assets {
  __typename: "Asset";
  catalogItem: UserAssets_assets_catalogItem | null;
}

export interface UserAssets {
  /**
   * Retrieves all assets based on the provided tenantid header and search filters
   * (NOTE: search filters are currently not active)
   */
  assets: UserAssets_assets[];
}

export interface UserAssetsVariables {
  assignedToId?: string | null;
}
