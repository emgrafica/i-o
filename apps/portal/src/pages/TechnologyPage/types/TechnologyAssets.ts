/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TechnologyAssets
// ====================================================

export interface TechnologyAssets_myTechnologyAssets_computers_actions {
  __typename: 'AssetActions';
  /**
   * Whether to show the return button
   */
  showReturn: boolean;
  /**
   * To show the replace button
   */
  showReplaceable: boolean;
  /**
   * To show the report broken button
   */
  showReportBroken: boolean;
  /**
   * Whether to show the edit usage button
   */
  showEditUsage: boolean;
  /**
   * Determine if a user can reassign this asset
   */
  canReassign: boolean;
  /**
   * Determine if a user can register ownership
   */
  canRegisterOwnership: boolean;
  /**
   * Determine if a user can report the asset missing
   */
  canReportMissing: boolean;
  /**
   * Determine if a user can report an error with this assets ownership
   */
  canReportOwnershipError: boolean;
  /**
   * Determine if a user can request the asset be wiped
   */
  canWipe: boolean;
}

export interface TechnologyAssets_myTechnologyAssets_computers {
  __typename: 'ComputerAssetCard';
  /**
   * The ID being assigned
   */
  id: string;
  /**
   * The product name
   */
  productName: string | null;
  /**
   * The image url
   */
  image: string | null;
  /**
   * The serial number
   */
  serialNumber: string;
  /**
   * The usage
   */
  usage: string | null;
  /**
   * The epoch time in milliseconds
   */
  expires: number | null;
  /**
   * The epoch time in milliseconds
   */
  issued: number | null;
  /**
   * The catalog item id, this may be removed in the future
   */
  catalogItemId: string | null;
  /**
   * The version ID of the asset
   */
  _etag: string;
  /**
   * Indicates whether the computer is eligible to be refreshed
   */
  refreshEligible: boolean;
  /**
   * Starting from this date the computer is eligible to be refreshed
   */
  refreshEligibleDate: number | null;
  /**
   * The available actions of this card
   */
  actions: TechnologyAssets_myTechnologyAssets_computers_actions | null;
}

export interface TechnologyAssets_myTechnologyAssets {
  __typename: 'AssetCardList';
  /**
   * Total number of items that matched the filters
   */
  totalItems: number | null;
  /**
   * The available computer to show
   */
  computers: TechnologyAssets_myTechnologyAssets_computers[] | null;
}

export interface TechnologyAssets {
  /**
   * The assets query
   */
  myTechnologyAssets: TechnologyAssets_myTechnologyAssets;
}

export interface TechnologyAssetsVariables {
  keywords?: string | null;
  pageSize: number;
  pageNumber: number;
}
