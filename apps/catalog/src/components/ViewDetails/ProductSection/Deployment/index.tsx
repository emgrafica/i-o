import React from 'react';
import { useTranslation } from 'react-i18next';
import { DefinitionList } from '../../index.style';
import { labelValuePair } from '../../utils';
import { ShippingCarrier } from 'gqlTypes/globalTypes';

export interface ProductSectionProps {
  /** Device being replaced if any */
  replacedDevice?: string | null | false;
  /** Tracking details for displaying link to track shipped asset */
  trackingDetails?: {
    carrierName: ShippingCarrier | null;
    number: string;
    url: string | null;
  } | null;
  /** Price of requested asset */
  price?: string | null | false;
  /** Reason for requested asset */
  reasonForRequest?: string | null | false;
  /** Name of requested asset */
  productName?: string | null;
  /** OS of requested computer */
  operatingSystem?: string | null | false;
  /** Keyboard configuration for requested computer */
  keyboard?: string | null | false;
  /** Plug type configuration for requested accessory */
  plugType?: string | null | false;
  /** Usage type assigned to the computer */
  deviceUsage?: string | null | false;
  /** Business justification for the request */
  justification?: string | null;
  /** Additional details provided for the request reason */
  reasonDetails?: string | null;
  /** Set to true if the device being returned is broken */
  isBroken?: boolean;
  /** Reason for canceling an order */
  cancelReason?: string | null | false;
  /** Reason for why the order was declined */
  declineReason?: string | null | false;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  replacedDevice,
  trackingDetails,
  price,
  reasonForRequest,
  productName,
  operatingSystem,
  keyboard,
  plugType,
  deviceUsage,
  justification,
  reasonDetails,
  isBroken,
  cancelReason,
  declineReason,
}) => {
  const { t } = useTranslation();
  const unknown = t(`common:unknown`);

  const tracking = trackingDetails && (
    <a
      href={trackingDetails.url || undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {trackingDetails.number}
    </a>
  );
  const carrier = trackingDetails && trackingDetails.carrierName;

  return (
    <>
      <DefinitionList>
        {productName &&
          labelValuePair(t('requests:order.product'), productName)}
        {labelValuePair(t('requests:order.price'), price || unknown)}
        {reasonForRequest &&
          labelValuePair(t('requests:order.requestReason'), reasonForRequest)}
        {operatingSystem &&
          labelValuePair(t('requests:order.operatingSystem'), operatingSystem)}
        {keyboard && labelValuePair(t('requests:order.keyboardLang'), keyboard)}
        {plugType && labelValuePair(t('requests:order.plugType'), plugType)}
        {deviceUsage &&
          labelValuePair(t('requests:order.deviceUsage'), deviceUsage)}
        {replacedDevice &&
          labelValuePair(t('requests:order.replacedDevice'), replacedDevice)}
      </DefinitionList>

      {justification && (
        <DefinitionList>
          {labelValuePair(
            t('requests:order.businessJustification'),
            justification,
          )}
        </DefinitionList>
      )}
      <DefinitionList>
        {reasonDetails &&
          labelValuePair(
            t(`requests:order.${isBroken ? 'brokenDetails' : 'returnDetails'}`),
            reasonDetails,
          )}
        {tracking &&
          carrier &&
          labelValuePair(
            `${carrier} ${t('requests:order.tracking')}`,
            tracking,
          )}
        {cancelReason &&
          labelValuePair(t('requests:order.cancelReason'), cancelReason)}
        {declineReason &&
          labelValuePair(t('requests:order.declineReason'), declineReason)}
      </DefinitionList>
    </>
  );
};

export default ProductSection;
