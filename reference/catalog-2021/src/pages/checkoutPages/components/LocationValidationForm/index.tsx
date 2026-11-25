import React from 'react';
import { AddressConfig } from 'graphql/queries/gqlTypes/AddressConfig';
import { parseAddressConfig } from '../../utils';
import SecureLocationRestriction from '../SecureLocationRestriction';
import FormValidationOverride from '../FormValidationOverride';

interface LocationValidationFormProps {
  addressConfigData: AddressConfig;
  showOverrideValidation?: boolean;
  handleFormValidationOverrideChange: () => void;
  willOverrideValidation: boolean;
}

/**
 *  Location Validation Form component
 */
const LocationValidationForm: React.FC<LocationValidationFormProps> = ({
  addressConfigData,
  showOverrideValidation,
  handleFormValidationOverrideChange,
  willOverrideValidation,
}) => {
  // It will parse addressConfigData to a flatter object to simplify the access to the data.
  const addressConfig = addressConfigData
    ? parseAddressConfig(addressConfigData.addressConfig)
    : null;

  let carrier = '';
  let restrictionMessage = '';
  if (addressConfig) {
    carrier = addressConfig.carrier;
    restrictionMessage = addressConfig.alert ? addressConfig.alert.text : '';
  }

  return showOverrideValidation ? (
    <FormValidationOverride
      checked={willOverrideValidation}
      onChange={handleFormValidationOverrideChange}
      carrier={carrier}
    />
  ) : restrictionMessage ? (
    <SecureLocationRestriction message={restrictionMessage} />
  ) : null;
};

export default LocationValidationForm;
