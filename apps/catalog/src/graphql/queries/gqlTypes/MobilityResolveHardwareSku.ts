/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SkuAnswer, CatalogPricingType } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: MobilityResolveHardwareSku
// ====================================================

export interface MobilityResolveHardwareSku_mobilityResolveHardwareSku_components_inputValues {
  __typename: "MobilityInputValue";
  /**
   * Unique ID of the input
   */
  id: string;
  /**
   * Input value
   */
  value: string;
  /**
   * Image url
   */
  image: string | null;
  /**
   * Flag to indicate if default value
   */
  default: boolean;
}

export interface MobilityResolveHardwareSku_mobilityResolveHardwareSku_components {
  __typename: "MobilitySkuComponent";
  /**
   * Unique ID of the component
   */
  id: string;
  /**
   * Unique component key
   */
  key: string;
  /**
   * The type of component to render
   */
  componentType: string;
  /**
   * The values to display for the user to input, empty if none
   */
  inputValues: MobilityResolveHardwareSku_mobilityResolveHardwareSku_components_inputValues[];
}

export interface MobilityResolveHardwareSku_mobilityResolveHardwareSku_sku_price {
  __typename: "Pricing";
  /**
   * The actual currency value or number of currency symbols to show depending on format
   */
  value: number;
  /**
   * The display format of the price
   */
  format: CatalogPricingType;
  /**
   * If pricing should be displayed
   */
  enabled: boolean;
}

export interface MobilityResolveHardwareSku_mobilityResolveHardwareSku_sku {
  __typename: "MobilitySkuData";
  /**
   * The SKU ID
   */
  sku: string;
  /**
   * Represents the lowest priced SKU of the catalog item. Used to display in the catalog.
   */
  price: MobilityResolveHardwareSku_mobilityResolveHardwareSku_sku_price | null;
}

export interface MobilityResolveHardwareSku_mobilityResolveHardwareSku {
  __typename: "MobilityResolveSku";
  /**
   * The next components that should render to narrow down the SKU
   */
  components: MobilityResolveHardwareSku_mobilityResolveHardwareSku_components[] | null;
  /**
   * The SKU of the product, null if the SKU has not been resolved
   */
  sku: MobilityResolveHardwareSku_mobilityResolveHardwareSku_sku | null;
}

export interface MobilityResolveHardwareSku {
  /**
   * Resolves the Mobility hardware SKU based on inputs
   */
  mobilityResolveHardwareSku: MobilityResolveHardwareSku_mobilityResolveHardwareSku;
}

export interface MobilityResolveHardwareSkuVariables {
  modelId: string;
  skuAnswers?: SkuAnswer[] | null;
  userId: string;
}
