/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CatalogRequestType } from '../globalTypes';

// ====================================================
// GraphQL query operation: AddressConfig
// ====================================================

export interface AddressConfig_addressConfig_alert {
  __typename: 'AddressAlert';
  /**
   * Tenant configured alert message
   */
  text: string;
}

export interface AddressConfig_addressConfig_shippingAddressData_name {
  __typename: 'AddressFields';
  /**
   * Value to be populated in form field
   */
  text: string;
  /**
   * Flag that determines if end user is allowed to modify this field
   */
  editable: boolean;
}

export interface AddressConfig_addressConfig_shippingAddressData_business {
  __typename: 'AddressFields';
  /**
   * Value to be populated in form field
   */
  text: string;
  /**
   * Flag that determines if end user is allowed to modify this field
   */
  editable: boolean;
}

export interface AddressConfig_addressConfig_shippingAddressData_address1 {
  __typename: 'AddressFields';
  /**
   * Value to be populated in form field
   */
  text: string;
  /**
   * Flag that determines if end user is allowed to modify this field
   */
  editable: boolean;
}

export interface AddressConfig_addressConfig_shippingAddressData_address2 {
  __typename: 'AddressFields';
  /**
   * Value to be populated in form field
   */
  text: string;
  /**
   * Flag that determines if end user is allowed to modify this field
   */
  editable: boolean;
}

export interface AddressConfig_addressConfig_shippingAddressData_state {
  __typename: 'AddressFields';
  /**
   * Value to be populated in form field
   */
  text: string;
  /**
   * Flag that determines if end user is allowed to modify this field
   */
  editable: boolean;
}

export interface AddressConfig_addressConfig_shippingAddressData_city {
  __typename: 'AddressFields';
  /**
   * Value to be populated in form field
   */
  text: string;
  /**
   * Flag that determines if end user is allowed to modify this field
   */
  editable: boolean;
}

export interface AddressConfig_addressConfig_shippingAddressData_zip {
  __typename: 'AddressFields';
  /**
   * Value to be populated in form field
   */
  text: string;
  /**
   * Flag that determines if end user is allowed to modify this field
   */
  editable: boolean;
}

export interface AddressConfig_addressConfig_shippingAddressData_country {
  __typename: 'AddressFields';
  /**
   * Value to be populated in form field
   */
  text: string;
  /**
   * Flag that determines if end user is allowed to modify this field
   */
  editable: boolean;
}

export interface AddressConfig_addressConfig_shippingAddressData_phoneNumber {
  __typename: 'AddressFields';
  /**
   * Value to be populated in form field
   */
  text: string;
  /**
   * Flag that determines if end user is allowed to modify this field
   */
  editable: boolean;
}

export interface AddressConfig_addressConfig_shippingAddressData {
  __typename: 'ShippingAddressFields';
  name: AddressConfig_addressConfig_shippingAddressData_name;
  business: AddressConfig_addressConfig_shippingAddressData_business;
  /**
   * Primary street address within an address
   */
  address1: AddressConfig_addressConfig_shippingAddressData_address1;
  /**
   * Optional secondary street address within an address
   */
  address2: AddressConfig_addressConfig_shippingAddressData_address2 | null;
  state: AddressConfig_addressConfig_shippingAddressData_state;
  city: AddressConfig_addressConfig_shippingAddressData_city;
  zip: AddressConfig_addressConfig_shippingAddressData_zip;
  country: AddressConfig_addressConfig_shippingAddressData_country;
  phoneNumber: AddressConfig_addressConfig_shippingAddressData_phoneNumber;
}

export interface AddressConfig_addressConfig {
  __typename: 'AddressConfig';
  /**
   * Alert message to appear on shipment form
   */
  alert: AddressConfig_addressConfig_alert | null;
  /**
   * The flag shows if the user can edit the address fields
   */
  addressEditable: boolean;
  /**
   * Shipping carrier
   */
  carrier: string;
  /**
   * This flag allows the user to bypass any validations that may occur when submitting the form
   */
  addressOverrideEnabled: boolean;
  /**
   * Data to be population on a shipment form
   */
  shippingAddressData: AddressConfig_addressConfig_shippingAddressData;
}

export interface AddressConfig {
  addressConfig: AddressConfig_addressConfig;
}

export interface AddressConfigVariables {
  catalogClass: string;
  requestType: CatalogRequestType;
  userId: string;
}
