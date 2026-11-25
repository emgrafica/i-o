/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogItemClass, CatalogPricingType } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL fragment: CatalogCardDetails
// ====================================================

export interface CatalogCardDetails_catalogModels_pricing {
  __typename: "Pricing";
  /**
   * The display format of the price
   */
  format: CatalogPricingType;
  /**
   * If pricing should be displayed
   */
  enabled: boolean;
  /**
   * The actual currency value or number of currency symbols to show depending on format
   */
  value: number;
}

export interface CatalogCardDetails_catalogModels_productOverlay {
  __typename: "ProductOverlay";
  /**
   * Type of product overlay
   */
  type: string | null;
  /**
   * Reason text
   */
  reason: string | null;
  /**
   * Expected availability text
   */
  availability: string | null;
}

export interface CatalogCardDetails_catalogModels {
  __typename: "CatalogModel";
  /**
   * The description of the catalog item
   */
  description: string | null;
  /**
   * The ID of the Tenant
   */
  tenantId: string;
  /**
   * The catalog class
   */
  class: CatalogItemClass;
  /**
   * The category of the catalog item
   */
  category: string;
  /**
   * The location of the catalog item image
   */
  catalogItemImage: string | null;
  /**
   * The name of the catalog item
   */
  catalogItemName: string;
  /**
   * Represents the lowest priced SKU of the catalog item. Used to display in the catalog.
   */
  pricing: CatalogCardDetails_catalogModels_pricing;
  productOverlay: CatalogCardDetails_catalogModels_productOverlay | null;
}

export interface CatalogCardDetails {
  __typename: "CatalogModels";
  /**
   * The list of catalog model results that match all filters
   */
  catalogModels: CatalogCardDetails_catalogModels[];
}
