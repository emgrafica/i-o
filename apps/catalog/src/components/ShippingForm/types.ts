import React from 'react';

/**
 * Two types of workflow
 */
export enum ShippingFormType {
  PICKUP = 'PICKUP',
  DELIVERY = 'DELIVERY',
}

/**
 * Additional variations props that allows the shipping form to be
 * customized in different workflow.
 */
export interface ShippingFormVariation {
  type?: ShippingFormType;
}

/**
 * <ShippingForm /> Props
 */
export interface ShippingFormDataProps {
  /**
   * Name input
   */
  name: string;
  /**
   * Name Error
   */
  nameErrorMessage?: string;
  /**
   * Company input
   */
  company: string;
  /**
   * Company Error
   */
  companyErrorMessage?: string;
  /**
   * Address 1 input
   */
  address1: string;
  /**
   * Address 1 error
   */
  address1ErrorMessage?: string;
  /**
   * Address 2 input
   */
  address2: string;
  /**
   * Address 2 error
   */
  address2ErrorMessage?: string;
  /**
   * City input
   */
  city: string;
  /**
   * City Error
   */
  cityErrorMessage?: string;
  /**
   * Country input
   */
  country: string;
  /**
   * Country Error
   */
  countryErrorMessage?: string;
  /**
   * Delivery Instructions input
   */
  additionalDeliveryInfo: string;
  /**
   * Phone Number input
   */
  phone: string;
  /**
   * Phone Error
   */
  phoneErrorMessage?: string;
  /**
   * State input
   */
  state: string;
  /**
   * State Error
   */
  stateErrorMessage?: string;
  /**
   * Zip Code input
   */
  zip: string;
  /**
   * Zip Error
   */
  zipErrorMessage?: string;
}

export interface ShippingFormChangeProps {
  /**
   * Generic onChange event, this is to introduce a simplified API for
   * this ShippingForm component to reduce more boilerplate.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Todo - remove these onXxChange props, a reducer pattern should be
   *  used instead to achieve API brevity.
   */
  /**
   * setState action that sets the Name input
   */
  onNameChange?: (name: string) => void;
  /**
   * setState action that sets the Company input
   */
  onCompanyChange?: (company: string) => void;
  /**
   * setState action that sets the Address 1 input
   */
  onAddress1Change?: (address1: string) => void;
  /**
   * setState action that sets the Address 2 input
   */
  onAddress2Change?: (address2: string) => void;
  /**
   * setState action that sets the City input
   */
  onCityChange?: (city: string) => void;
  /**
   * setState action that sets the Country input
   */
  onCountryChange?: (country: string) => void;
  /**
   * setState action that sets the Delivery Instructions input
   */
  onAdditionalDeliveryInfoChange?: (additionalDeliveryInfo: string) => void;
  /**
   * setState action that sets the Phone Number input
   */
  onPhoneChange?: (phone: string) => void;
  /**
   * setState action that sets the State input
   */
  onStateChange?: (state: string) => void;
  /**
   * setState action that sets the Zip Code input
   */
  onZipChange?: (zip: string) => void;
}

export interface ShippingFormControlProps {
  /**
   * Country disabled value
   */
  countryDisabled?: boolean;

  /**
   * Name disabled value
   */
  nameDisabled?: boolean;

  /**
   * Company disabled value
   */
  companyDisabled?: boolean;

  /**
   * Address1 disabled value
   */
  address1Disabled?: boolean;

  /**
   * Address2 disabled value
   */
  address2Disabled?: boolean;

  /**
   * City disabled value
   */
  cityDisabled?: boolean;

  /**
   * State disabled value
   */
  stateDisabled?: boolean;

  /**
   * Zip disabled value
   */
  zipDisabled?: boolean;
}
