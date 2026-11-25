/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateCatalogOrderInput } from "./../../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateCatalogOrder
// ====================================================

export interface CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_address1 {
  __typename: "AddressFieldError";
  /**
   * Error code which identifies this error from the validation api
   */
  code: string | null;
  /**
   * Error message from the validation api
   */
  text: string;
  /**
   * Whether we should show the error on the frontend or not
   */
  inLine: boolean;
}

export interface CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_address2 {
  __typename: "AddressFieldError";
  /**
   * Error code which identifies this error from the validation api
   */
  code: string | null;
  /**
   * Error message from the validation api
   */
  text: string;
  /**
   * Whether we should show the error on the frontend or not
   */
  inLine: boolean;
}

export interface CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_city {
  __typename: "AddressFieldError";
  /**
   * Error code which identifies this error from the validation api
   */
  code: string | null;
  /**
   * Error message from the validation api
   */
  text: string;
  /**
   * Whether we should show the error on the frontend or not
   */
  inLine: boolean;
}

export interface CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_state {
  __typename: "AddressFieldError";
  /**
   * Error code which identifies this error from the validation api
   */
  code: string | null;
  /**
   * Error message from the validation api
   */
  text: string;
  /**
   * Whether we should show the error on the frontend or not
   */
  inLine: boolean;
}

export interface CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_zip {
  __typename: "AddressFieldError";
  /**
   * Error code which identifies this error from the validation api
   */
  code: string | null;
  /**
   * Error message from the validation api
   */
  text: string;
  /**
   * Whether we should show the error on the frontend or not
   */
  inLine: boolean;
}

export interface CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_country {
  __typename: "AddressFieldError";
  /**
   * Error code which identifies this error from the validation api
   */
  code: string | null;
  /**
   * Error message from the validation api
   */
  text: string;
  /**
   * Whether we should show the error on the frontend or not
   */
  inLine: boolean;
}

export interface CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors {
  __typename: "ShippingAddressErrors";
  /**
   * Primary street address within an address
   */
  address1: CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_address1 | null;
  /**
   * Optional secondary street address within an address
   */
  address2: CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_address2 | null;
  city: CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_city | null;
  state: CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_state | null;
  zip: CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_zip | null;
  country: CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors_country | null;
}

export interface CreateCatalogOrder_createCatalogOrder_shippingForm {
  __typename: "AddressSubmissionResponse";
  /**
   * Flag that determines if an address was successfully validated
   */
  isAddressValid: boolean | null;
  /**
   * Contains error states of each address field within the shipping form
   */
  shippingAddressErrors: CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors | null;
}

export interface CreateCatalogOrder_createCatalogOrder {
  __typename: "OrderConfirmation";
  requestId: string | null;
  ticketId: string | null;
  /**
   * Contains results of the shipping form submission if applicable
   */
  shippingForm: CreateCatalogOrder_createCatalogOrder_shippingForm | null;
}

export interface CreateCatalogOrder {
  createCatalogOrder: CreateCatalogOrder_createCatalogOrder;
}

export interface CreateCatalogOrderVariables {
  data: CreateCatalogOrderInput;
}
