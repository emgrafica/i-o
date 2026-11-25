import React from 'react';
import { useTranslation } from 'react-i18next';
import ShippingForm from 'components/ShippingForm';
import { FormField } from 'utils/useFormFields';
import { AddressConfig } from 'graphql/queries/gqlTypes/AddressConfig';
import {
  getFieldErrorMessage,
  ShippingFormFields,
  parseAddressConfig,
} from '../../utils';
import { CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors } from '../../queries/gqlTypes/CreateCatalogOrder';
import SectionHeader from 'components/SectionHeader';

interface FormDataProps {
  name: FormField;
  company: FormField;
  address1: FormField;
  address2: FormField;
  city: FormField;
  state: FormField;
  zipCode: FormField;
  country: FormField;
  phoneNumber: FormField;
  deliveryInstructions: FormField;
}

interface ShippingProps {
  isLoading: boolean;
  addressConfigData: AddressConfig;
  formData: FormDataProps;
  formWasSubmitted: boolean;
  shippingAddressErrors?: CreateCatalogOrder_createCatalogOrder_shippingForm_shippingAddressErrors | null;
}

/**
 *  Shipping component
 */
const Shipping: React.FC<ShippingProps> = ({
  isLoading,
  addressConfigData,
  formData,
  formWasSubmitted,
  shippingAddressErrors,
}) => {
  const { t } = useTranslation();

  // It will parse addressConfigData to a flatter object to simplify the access to the data.
  const addressConfig = addressConfigData
    ? parseAddressConfig(addressConfigData.addressConfig)
    : null;

  let isCountryDisabled;
  let isNameDisabled;
  let isCompanyDisabled;
  let isAddress1Disabled;
  let isAddress2Disabled;
  let isCityDisabled;
  let isStateDisabled;
  let isZipDisabled;
  if (addressConfig) {
    isCountryDisabled = Boolean(
      addressConfig.country.text.length > 0 || !addressConfig.country.editable,
    );
    isNameDisabled = !addressConfig.name.editable;
    isCompanyDisabled = !addressConfig.business.editable;
    isAddress1Disabled = !addressConfig.address1.editable;
    isAddress2Disabled = Boolean(
      addressConfig.address2 && !addressConfig.address2.editable,
    );
    isCityDisabled = !addressConfig.city.editable;
    isStateDisabled = !addressConfig.state.editable;
    isZipDisabled = !addressConfig.zip.editable;
  }

  return (
    <>
      <SectionHeader title={t('common:shipping')} />
      <ShippingForm
        isLoading={isLoading}
        name={formData.name.value}
        onNameChange={formData.name.set}
        nameErrorMessage={getFieldErrorMessage(
          formData.name,
          ShippingFormFields.NAME,
          t,
          formWasSubmitted,
        )}
        company={formData.company.value}
        onCompanyChange={formData.company.set}
        companyErrorMessage={getFieldErrorMessage(
          formData.company,
          ShippingFormFields.COMPANY,
          t,
          formWasSubmitted,
        )}
        address1={formData.address1.value}
        onAddress1Change={formData.address1.set}
        address1ErrorMessage={getFieldErrorMessage(
          formData.address1,
          ShippingFormFields.ADDRESS1,
          t,
          formWasSubmitted,
          shippingAddressErrors,
        )}
        address2={formData.address2.value}
        onAddress2Change={formData.address2.set}
        address2ErrorMessage={getFieldErrorMessage(
          formData.address2,
          ShippingFormFields.ADDRESS2,
          t,
          formWasSubmitted,
          shippingAddressErrors,
        )}
        city={formData.city.value}
        onCityChange={formData.city.set}
        cityErrorMessage={getFieldErrorMessage(
          formData.city,
          ShippingFormFields.CITY,
          t,
          formWasSubmitted,
          shippingAddressErrors,
        )}
        state={formData.state.value}
        onStateChange={formData.state.set}
        stateErrorMessage={getFieldErrorMessage(
          formData.state,
          ShippingFormFields.STATE,
          t,
          formWasSubmitted,
          shippingAddressErrors,
        )}
        zip={formData.zipCode.value}
        onZipChange={formData.zipCode.set}
        zipErrorMessage={getFieldErrorMessage(
          formData.zipCode,
          ShippingFormFields.ZIPCODE,
          t,
          formWasSubmitted,
          shippingAddressErrors,
        )}
        country={formData.country.value}
        onCountryChange={formData.country.set}
        countryErrorMessage={getFieldErrorMessage(
          formData.country,
          ShippingFormFields.COUNTRY,
          t,
          formWasSubmitted,
          shippingAddressErrors,
        )}
        phone={formData.phoneNumber.value}
        onPhoneChange={formData.phoneNumber.set}
        phoneErrorMessage={getFieldErrorMessage(
          formData.phoneNumber,
          ShippingFormFields.PHONE,
          t,
          formWasSubmitted,
        )}
        additionalDeliveryInfo={formData.deliveryInstructions.value}
        onAdditionalDeliveryInfoChange={formData.deliveryInstructions.set}
        countryDisabled={isCountryDisabled}
        nameDisabled={isNameDisabled}
        companyDisabled={isCompanyDisabled}
        address1Disabled={isAddress1Disabled}
        address2Disabled={isAddress2Disabled}
        cityDisabled={isCityDisabled}
        stateDisabled={isStateDisabled}
        zipDisabled={isZipDisabled}
      />
    </>
  );
};

export default Shipping;
