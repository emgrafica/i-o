import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@lumos/core';
import Form from 'components/ShippingForm';
import SectionHeader from 'components/SectionHeader';
import { ShippingFormType } from 'components/ShippingForm/types';

import { ActionTypes } from '../types';
import { useCheckoutContext } from '../index';

const ShippingForm: React.FC = () => {
  const { t } = useTranslation('addressForm');
  const { state: checkoutState, dispatch } = useCheckoutContext();
  const {
    name,
    company,
    address1,
    address2,
    city,
    state,
    zip,
    country,
    phone,
    additionalDeliveryInfo,
  } = checkoutState.shippingAddress;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypes.SHIPPING_CHANGE,
      payload: {
        field: event.target.name,
        value: event.target.value,
      },
    });
  };

  return (
    <Box>
      <SectionHeader title={t('pickupAddress')} />
      <Form
        type={ShippingFormType.PICKUP}
        name={name}
        company={company}
        address1={address1}
        address2={address2}
        city={city}
        state={state}
        zip={zip}
        country={country}
        phone={phone}
        additionalDeliveryInfo={additionalDeliveryInfo}
        onChange={onChange}
      />
    </Box>
  );
};

export default ShippingForm;
