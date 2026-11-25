/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogItemClass } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: CatalogEntitlement
// ====================================================

export interface CatalogEntitlement_catalogEntitlement {
  __typename: "CatalogEntitlement";
  /**
   * Whether or not the user is entitled to see Catalog items
   */
  entitled: boolean;
}

export interface CatalogEntitlement {
  /**
   * Retrieves a user catalog entitlement status
   */
  catalogEntitlement: CatalogEntitlement_catalogEntitlement;
}

export interface CatalogEntitlementVariables {
  catalogClass: CatalogItemClass;
  userId: string;
}
