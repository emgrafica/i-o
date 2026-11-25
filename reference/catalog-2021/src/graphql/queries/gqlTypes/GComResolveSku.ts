/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SkuAnswer } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL query operation: GComResolveSku
// ====================================================

export interface GComResolveSku_gcomResolveSku_components_inputValues {
  __typename: "GcomInputValue";
  /**
   * Unique ID of the input
   */
  id: string;
  /**
   * Input value
   */
  value: string;
}

export interface GComResolveSku_gcomResolveSku_components {
  __typename: "GcomSkuComponent";
  /**
   * Unique ID of the component
   */
  id: string;
  /**
   * Unique component key
   */
  key: string;
  /**
   * The component label
   */
  label: string;
  /**
   * Whether or not an input is required
   */
  required: boolean;
  /**
   * Max length of the input if component is a text field
   */
  maxLength: number | null;
  /**
   * Tooltip text to display with the component
   */
  tooltip: string | null;
  /**
   * The type of component to render
   */
  componentType: string;
  /**
   * Input type
   */
  inputType: string;
  /**
   * The values to display for the user to input, empty if none
   */
  inputValues: GComResolveSku_gcomResolveSku_components_inputValues[];
  /**
   * Used for order input field and when creating the order
   */
  isPersonal: boolean | null;
}

export interface GComResolveSku_gcomResolveSku_sku {
  __typename: "GcomSkuData";
  /**
   * The SKU ID
   */
  sku: string;
  /**
   * The Description of the SKU
   */
  description: string;
  /**
   * The SKU image
   */
  image: string | null;
  /**
   * The reason for the request
   */
  reasonForRequest: string;
  /**
   * Whether the SKU has shipping or not
   */
  hasShipping: boolean;
}

export interface GComResolveSku_gcomResolveSku {
  __typename: "GcomResolveSku";
  /**
   * The next components that should render to narrow down the SKU
   */
  components: GComResolveSku_gcomResolveSku_components[] | null;
  /**
   * The SKU of the product, null if the SKU has not been resolved
   */
  sku: GComResolveSku_gcomResolveSku_sku | null;
}

export interface GComResolveSku {
  /**
   * Resolves the GCOM SKU based on inputs
   */
  gcomResolveSku: GComResolveSku_gcomResolveSku;
}

export interface GComResolveSkuVariables {
  productCode: string;
  skuAnswers?: SkuAnswer[] | null;
  sku?: string | null;
  assignedToId?: string | null;
  site?: string | null;
}
