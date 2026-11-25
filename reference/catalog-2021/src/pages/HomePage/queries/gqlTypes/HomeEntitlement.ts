/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HomeEntitlement
// ====================================================

export interface HomeEntitlement_entitlement_obo {
  __typename: "EntitlementObo";
  /**
   * Signals if user is entitled to a feature
   */
  enabled: boolean;
}

export interface HomeEntitlement_entitlement_search {
  __typename: "EntitlementSearch";
  /**
   * Signals if user is entitled to a feature
   */
  enabled: boolean;
}

export interface HomeEntitlement_entitlement {
  __typename: "Entitlement";
  /**
   * Entitlement for the On Behalf Of (OBO) feature
   */
  obo: HomeEntitlement_entitlement_obo;
  /**
   * Entitlement for the search feature
   */
  search: HomeEntitlement_entitlement_search;
}

export interface HomeEntitlement {
  entitlement: HomeEntitlement_entitlement;
}
