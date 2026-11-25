/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SkuAnswer } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: MobilityResolvePlanSku
// ====================================================

export interface MobilityResolvePlanSku_mobilityResolvePlanSku_components_inputValues {
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

export interface MobilityResolvePlanSku_mobilityResolvePlanSku_components {
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
  inputValues: MobilityResolvePlanSku_mobilityResolvePlanSku_components_inputValues[];
}

export interface MobilityResolvePlanSku_mobilityResolvePlanSku_sku_features {
  __typename: "MobilitySkuFeatures";
  /**
   * The feature ID
   */
  id: string;
  /**
   * The feature name
   */
  name: string;
  /**
   * The feature recurring price
   */
  recurringPrice: string | null;
  /**
   * The feature recurring price currency
   */
  recurringPriceCurrency: string | null;
  /**
   * The feature recurring price frequency
   */
  recurringPriceFrequency: string | null;
}

export interface MobilityResolvePlanSku_mobilityResolvePlanSku_sku {
  __typename: "MobilitySkuData";
  /**
   * The SKU ID
   */
  sku: string;
  /**
   * The available features of a chosen plan
   */
  features: MobilityResolvePlanSku_mobilityResolvePlanSku_sku_features[] | null;
}

export interface MobilityResolvePlanSku_mobilityResolvePlanSku {
  __typename: "MobilityResolveSku";
  /**
   * The next components that should render to narrow down the SKU
   */
  components: MobilityResolvePlanSku_mobilityResolvePlanSku_components[] | null;
  /**
   * The SKU of the product, null if the SKU has not been resolved
   */
  sku: MobilityResolvePlanSku_mobilityResolvePlanSku_sku | null;
}

export interface MobilityResolvePlanSku {
  /**
   * Resolves the Mobility plan SKU based on inputs
   */
  mobilityResolvePlanSku: MobilityResolvePlanSku_mobilityResolvePlanSku;
}

export interface MobilityResolvePlanSkuVariables {
  modelId: string;
  skuId: string;
  skuAnswers?: SkuAnswer[] | null;
  userId: string;
}
