import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography, Box, Form, Grid } from '@lumos/core';
import {
  ShippingFormChangeProps,
  ShippingFormControlProps,
  ShippingFormDataProps,
  ShippingFormType,
  ShippingFormVariation,
} from './types';
import SkeletonShippingForm from './SkeletonShippingForm';

interface LoadingProps {
  isLoading?: boolean;
}

type ShippingFormProps = ShippingFormDataProps &
  ShippingFormChangeProps &
  ShippingFormVariation &
  ShippingFormControlProps &
  LoadingProps;

/**
 * Form for shipping form
 *
 * @param props
 */
const ShippingForm: React.FC<ShippingFormProps> = ({
  isLoading,
  country,
  name,
  onNameChange,
  nameDisabled,
  onChange,
  company,
  onCompanyChange,
  companyDisabled,
  address1,
  onAddress1Change,
  address1Disabled,
  address2,
  onAddress2Change,
  address2Disabled,
  city,
  onCityChange,
  cityDisabled,
  state,
  onStateChange,
  stateDisabled,
  zip,
  onZipChange,
  zipDisabled,
  type,
  countryDisabled,
  onCountryChange,
  phone,
  onPhoneChange,
  additionalDeliveryInfo,
  onAdditionalDeliveryInfoChange,
  nameErrorMessage,
  address1ErrorMessage,
  address2ErrorMessage,
  companyErrorMessage,
  cityErrorMessage,
  countryErrorMessage,
  phoneErrorMessage,
  stateErrorMessage,
  zipErrorMessage,
}) => {
  const { t } = useTranslation();

  /**
   * This method is used to get the variation based on differnt workflow.
   * Add more variations as needed.
   */
  const getVariation = (type?: ShippingFormType) => {
    switch (type) {
      case ShippingFormType.PICKUP:
        return {
          additionalDeliveryInfo: {
            label: t('common:pickupInstructions'),
            placeholder: t('common:pickupInstructions'),
          },
          country: {
            required: false,
            readOnly: true,
            value: 'United States',
          },
        };
      default:
        return {
          additionalDeliveryInfo: {
            label: t('common:deliveryInstructions'),
            placeholder: t('common:deliveryInstructions'),
          },
          country: {
            required: true,
            readOnly: false,
            value: country,
          },
        };
    }
  };

  return isLoading ? (
    <SkeletonShippingForm />
  ) : (
    <Form name="ShippingForm" padding={0}>
      <Form.Section padding={0}>
        {/* Name */}
        <Form.Item
          paddingX={0}
          paddingY={1}
          label={t('common:name')}
          htmlFor="shippingNameInput"
          required
        >
          <Form.Input
            id="nameInput"
            name="name"
            minLength={1}
            maxLength={36}
            type="text"
            placeholder={t('common:name')}
            disabled={nameDisabled}
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onNameChange && onNameChange(event.currentTarget.value);
              onChange && onChange(event);
            }}
            hasError={!!nameErrorMessage}
          />
          {/* Display Error Message */}
          <Typography kind="feedback" paddingTop={1}>
            {nameErrorMessage && nameErrorMessage}
          </Typography>
        </Form.Item>
        {/* Company */}
        <Form.Item
          paddingX={0}
          paddingY={1}
          label={t('common:company')}
          htmlFor="shippingCompanyInput"
          required
        >
          <Form.Input
            id="companyInput"
            name="company"
            minLength={1}
            maxLength={36}
            type="text"
            placeholder="Business"
            disabled={companyDisabled}
            value={company}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onCompanyChange && onCompanyChange(event.currentTarget.value);
              onChange && onChange(event);
            }}
            hasError={!!companyErrorMessage}
          />
          {/* Display Error Message */}
          <Typography kind="feedback" paddingTop={1}>
            {companyErrorMessage && companyErrorMessage}
          </Typography>
        </Form.Item>
        {/* Address 1 */}
        <Form.Item
          paddingX={0}
          paddingY={1}
          label={t('common:address')}
          htmlFor="shippingAddress1Input"
          required
        >
          <Form.Input
            id="address1Input"
            name="address1"
            minLength={1}
            maxLength={48}
            type="text"
            placeholder={t('common:address')}
            disabled={address1Disabled}
            value={address1}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onAddress1Change && onAddress1Change(event.currentTarget.value);
              onChange && onChange(event);
            }}
            hasError={!!address1ErrorMessage}
          />
          {/* Display Error Message */}
          <Typography kind="feedback" paddingTop={1}>
            {address1ErrorMessage && address1ErrorMessage}
          </Typography>
        </Form.Item>
        {/* Address 2 */}
        <Form.Item
          paddingX={0}
          paddingY={1}
          label={t('common:address2')}
          htmlFor="shippingAddress2Input"
        >
          <Form.Input
            id="address2Input"
            name="address2"
            minLength={1}
            maxLength={48}
            type="text"
            placeholder={t('common:address2')}
            disabled={address2Disabled}
            value={address2}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onAddress2Change && onAddress2Change(event.currentTarget.value);
              onChange && onChange(event);
            }}
            hasError={!!address2ErrorMessage}
          />
          {/* Display Error Message */}
          <Typography kind="feedback" paddingTop={1}>
            {address2ErrorMessage && address2ErrorMessage}
          </Typography>
        </Form.Item>
        {/* City */}
        <Form.Item
          paddingX={0}
          paddingY={1}
          label={t('common:city')}
          htmlFor="shippingCityInput"
          required
        >
          <Form.Input
            id="cityInput"
            name="city"
            minLength={1}
            maxLength={36}
            type="text"
            placeholder={t('common:city')}
            disabled={cityDisabled}
            value={city}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onCityChange && onCityChange(event.currentTarget.value);
              onChange && onChange(event);
            }}
            hasError={!!cityErrorMessage}
          />
          {/* Display Error Message */}
          <Typography kind="feedback" paddingTop={1}>
            {cityErrorMessage && cityErrorMessage}
          </Typography>
        </Form.Item>
        <Grid flexWrap="wrap">
          <Box flex={1}>
            {/* State */}
            <Form.Item
              paddingLeft={0}
              paddingY={1}
              label={t('common:state')}
              htmlFor="shippingStateInput"
              required
            >
              <Form.Input
                id="stateInput"
                name="state"
                minLength={1}
                maxLength={36}
                type="text"
                placeholder={t('common:state')}
                disabled={stateDisabled}
                value={state}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  onStateChange && onStateChange(event.currentTarget.value);
                  onChange && onChange(event);
                }}
                hasError={!!stateErrorMessage}
              />
              {/* Display Error Message */}
              <Typography kind="feedback" paddingTop={1}>
                {stateErrorMessage && stateErrorMessage}
              </Typography>
            </Form.Item>
          </Box>
          <Box flex={1}>
            {/* Zip Code */}
            <Form.Item
              paddingRight={0}
              paddingY={1}
              paddingLeft={{ xxs: 0, xs: 0, sm: 0, md: 0 }}
              label={t('common:zipCode')}
              htmlFor="shippingZipCodeInput"
              required
            >
              <Form.Input
                id="zipCodeInput"
                name="zip"
                minLength={1}
                maxLength={12}
                type="text"
                placeholder={t('common:zipCode')}
                disabled={zipDisabled}
                value={zip}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  onZipChange && onZipChange(event.currentTarget.value);
                  onChange && onChange(event);
                }}
                hasError={!!zipErrorMessage}
              />
              {/* Display Error Message */}
              <Typography kind="feedback" paddingTop={1}>
                {zipErrorMessage && zipErrorMessage}
              </Typography>
            </Form.Item>
          </Box>
        </Grid>
        {/* Country */}
        <Form.Item
          paddingX={0}
          paddingY={1}
          label={t('common:country')}
          htmlFor="shippingCountryInput"
          tooltip={t('addressForm:orderCountryTooltip')}
          required={getVariation(type).country.required}
        >
          <Form.Input
            id="countryInput"
            name="country"
            minLength={1}
            maxLength={36}
            type="text"
            disabled={getVariation(type).country.readOnly || countryDisabled}
            placeholder={t('common:country')}
            value={getVariation(type).country.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onCountryChange && onCountryChange(event.currentTarget.value);
              onChange && onChange(event);
            }}
            hasError={!!countryErrorMessage}
          />
          {/* Display Error Message */}
          <Typography kind="feedback" paddingTop={1}>
            {countryErrorMessage && countryErrorMessage}
          </Typography>
        </Form.Item>
        {/* Phone Number */}
        <Form.Item
          paddingX={0}
          paddingY={1}
          label={t('common:phoneNumber')}
          htmlFor="shippingPhoneNumberInput"
          tooltip={t('addressForm:phoneTooltip')}
          required
        >
          <Form.Input
            id="phoneNumberInput"
            name="phone"
            minLength={5}
            maxLength={24}
            type="text"
            placeholder="(123) 456-7890"
            value={phone}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onPhoneChange && onPhoneChange(event.currentTarget.value);
              onChange && onChange(event);
            }}
            hasError={!!phoneErrorMessage}
          />
          {/* Display Error Message */}
          <Typography kind="feedback" paddingTop={1}>
            {phoneErrorMessage && phoneErrorMessage}
          </Typography>
        </Form.Item>
        {/* Delivery Instructions */}
        <Form.Item
          paddingX={0}
          paddingY={1}
          label={getVariation(type).additionalDeliveryInfo.label}
          htmlFor="shippingDeliveryInstructionsInput"
          tooltip={t('addressForm:deliveryInstructionsTooltip')}
        >
          <Form.Input
            id="deliveryInstructionsInput"
            name="additionalDeliveryInfo"
            minLength={1}
            maxLength={500}
            type="text"
            placeholder={getVariation(type).additionalDeliveryInfo.placeholder}
            value={additionalDeliveryInfo}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              onAdditionalDeliveryInfoChange &&
                onAdditionalDeliveryInfoChange(event.currentTarget.value);
              onChange && onChange(event);
            }}
          />
        </Form.Item>
      </Form.Section>
    </Form>
  );
};

export default ShippingForm;
