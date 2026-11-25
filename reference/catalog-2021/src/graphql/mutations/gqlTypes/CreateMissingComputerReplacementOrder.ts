/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressInfoInput } from "./../../../gqlTypes/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateMissingComputerReplacementOrder
// ====================================================

export interface CreateMissingComputerReplacementOrder_createReplaceMissingComputerOrder_error {
  __typename: "ValidateAddressError";
  /**
   * The validation error message
   */
  message: string;
  /**
   * The field on which the error occured
   */
  field: string | null;
  /**
   * Show the error on the front-end or not
   */
  inLine: boolean | null;
  /**
   * The specific code that identifies this error from another validation error
   */
  code: string | null;
}

export interface CreateMissingComputerReplacementOrder_createReplaceMissingComputerOrder_shippingForm {
  __typename: "AddressSubmissionResponse";
  /**
   * Flag that determines if an address was successfully validated
   */
  isAddressValid: boolean | null;
}

export interface CreateMissingComputerReplacementOrder_createReplaceMissingComputerOrder_assetTicket {
  __typename: "AssetActionTicket";
  /**
   * Service ticket id generated
   */
  ticketId: string;
}

export interface CreateMissingComputerReplacementOrder_createReplaceMissingComputerOrder {
  __typename: "OrderConfirmation";
  requestId: string | null;
  ticketId: string | null;
  /**
   * An address validation error encountered while creating an order
   */
  error: CreateMissingComputerReplacementOrder_createReplaceMissingComputerOrder_error[] | null;
  /**
   * Contains results of the shipping form submission if applicable
   */
  shippingForm: CreateMissingComputerReplacementOrder_createReplaceMissingComputerOrder_shippingForm | null;
  /**
   * Contains the service ticket, if this is applicable
   */
  assetTicket: CreateMissingComputerReplacementOrder_createReplaceMissingComputerOrder_assetTicket | null;
}

export interface CreateMissingComputerReplacementOrder {
  createReplaceMissingComputerOrder: CreateMissingComputerReplacementOrder_createReplaceMissingComputerOrder;
}

export interface CreateMissingComputerReplacementOrderVariables {
  requestedFor: string;
  shippingInfo: AddressInfoInput;
  deviceUsage?: string | null;
  validateAddress?: boolean | null;
  quantity?: number | null;
  assetId: string;
  requestedForId: string;
  description: string;
  caseNumber: string;
  serialNumber?: string | null;
}
