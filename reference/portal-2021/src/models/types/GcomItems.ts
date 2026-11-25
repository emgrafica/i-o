/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GcomItems
// ====================================================

export interface GcomItems_gcomItems {
  __typename: 'GcomItem';
  /**
   * Unique code of the product
   */
  code: string;
  /**
   * Name of the product
   */
  name: string;
  /**
   * Whether or not this is the default item
   */
  default: boolean | null;
}

export interface GcomItems {
  /**
   * Retrieves a list of GCOM products based on user and site
   */
  gcomItems: GcomItems_gcomItems[];
}

export interface GcomItemsVariables {
  site: string;
  userId: string;
}
