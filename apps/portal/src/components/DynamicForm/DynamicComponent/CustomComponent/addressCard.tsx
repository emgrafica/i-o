// @ts-nocheck
import React from 'react';
import { IoDeliveryCard } from '@i-o/design-system';
import ShippingServices from 'services/shippingServices';
import { countryData, stateData } from './addressData';
import { getCountryLabelByCode } from 'utils/function';
export interface AddressCard {
  data: any;
}

const AddressCard: React.FC<PrimaryDeviceItemCard> = ({
  data,
  value,
  label,
  error,
  onChange,
  errorText,
  disabled,
}) => {
  const validateAddress = async address => {
    const res = await ShippingServices.getValidAddress({
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zipCode,
      country: getCountryLabelByCode(address.country, countryData),
      secondStreet: address.address2,
    });
    if (!res) {
      return {
        isValid: false,
        message: 'Connection error',
      };
    } else {
      return res;
    }
  };
  return (
    <IoDeliveryCard
      // {...defaultProps}
      title={label}
      addressItem={value ? value : data}
      disabled={disabled}
      // validationFunc={validateAddress}
      error={error}
      countryData={countryData}
      stateData={stateData}
      errorText={errorText}
      onChange={value => {
        onChange(value);
      }}
    />
  );
};

export default AddressCard;
