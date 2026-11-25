import React from 'react';
import { useTranslation } from 'react-i18next';
import { DefinitionList } from '../index.style';
import { labelValuePair } from '../utils';

interface ShippingSectionProps {
  contactName?: string | null;
  company?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  contactPhoneNumber?: string | null;
  additionalDeliveryInfo?: string | null;
}

const ShippingSection: React.FC<ShippingSectionProps> = ({
  contactName,
  company,
  address1,
  address2,
  city,
  state,
  zip,
  country,
  contactPhoneNumber,
  additionalDeliveryInfo,
}) => {
  const { t } = useTranslation();

  const shippingLabel = (
    <>
      {contactName}
      <br />
      {company}
      <br />
      {address1}
      {address2 && address2.trim() && (
        <>
          <br />
          {address2}
        </>
      )}
      <br />
      {city} {state} {zip}
      <br />
      {country}
      <br />
      {contactPhoneNumber}
      {additionalDeliveryInfo !== '' && (
        <>
          <br />
          {additionalDeliveryInfo}
        </>
      )}
    </>
  );

  return (
    <DefinitionList>
      {labelValuePair(t('requests:order.shippingDetails'), shippingLabel)}
    </DefinitionList>
  );
};

export default ShippingSection;
