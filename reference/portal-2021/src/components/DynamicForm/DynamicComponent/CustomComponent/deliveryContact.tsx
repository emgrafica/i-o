// @ts-nocheck
import React from 'react';
import { IoContactCard } from '@i-o/design-system';
import { countryData, stateData } from './addressData';
export interface DeliveryContact {
  data: any;
}

const DeliveryContact: React.FC<PrimaryDeviceItemCard> = ({
  data,
  value,
  label,
  error,
  onChange,
  errorText,
  disabled,
}) => {
  return (
    <IoContactCard
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

export default DeliveryContact;
