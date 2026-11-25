/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMobilityCatalogOrderInput } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateMobilityCatalogOrder
// ====================================================

export interface CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_address1 {
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

export interface CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_address2 {
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

export interface CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_city {
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

export interface CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_state {
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

export interface CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_zip {
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

export interface CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_country {
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

export interface CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors {
  __typename: "ShippingAddressErrors";
  /**
   * Primary street address within an address
   */
  address1: CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_address1 | null;
  /**
   * Optional secondary street address within an address
   */
  address2: CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_address2 | null;
  city: CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_city | null;
  state: CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_state | null;
  zip: CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_zip | null;
  country: CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors_country | null;
}

export interface CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm {
  __typename: "AddressSubmissionResponse";
  /**
   * Flag that determines if an address was successfully validated
   */
  isAddressValid: boolean | null;
  /**
   * Contains error states of each address field within the shipping form
   */
  shippingAddressErrors: CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm_shippingAddressErrors | null;
}

export interface CreateMobilityCatalogOrder_createMobilityCatalogOrder {
  __typename: "OrderConfirmation";
  requestId: string | null;
  ticketId: string | null;
  /**
   * Contains results of the shipping form submission if applicable
   */
  shippingForm: CreateMobilityCatalogOrder_createMobilityCatalogOrder_shippingForm | null;
}

export interface CreateMobilityCatalogOrder {
  createMobilityCatalogOrder: CreateMobilityCatalogOrder_createMobilityCatalogOrder;
}

export interface CreateMobilityCatalogOrderVariables {
  data: CreateMobilityCatalogOrderInput;
}
