import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  RequestServiceCategoryType,
  RequestStatusType,
} from 'models/globalTypes';
import { DefinitionList } from '../../index.style';
import { labelValuePair } from '../../utils';
import { getReasonForRequestI18nKey } from 'pages/OrdersAndIncidentsPage/utils';
import { MyRequests_myRequests_items } from 'models/types/MyRequests';

interface ProductSectionProps {
  order: MyRequests_myRequests_items;
}

const ProductSection: React.FC<ProductSectionProps> = ({ order }) => {
  const { t } = useTranslation();
  const name = order.existingProduct && order.existingProduct.name;

  const tracking = order.trackingDetails && (
    <a
      href={order.trackingDetails.url || undefined}
      target="_blank"
      rel="noopener noreferrer"
    >
      {order.trackingDetails.number}
    </a>
  );
  const carrier = order.trackingDetails && order.trackingDetails.carrierName;

  const cancelReason =
    order.request.status === RequestStatusType.Cancelled &&
    order.request.closingInformation &&
    order.request.closingInformation.reason;

  const declineReason =
    order.request.status === RequestStatusType.Declined &&
    order.request.closingInformation &&
    order.request.closingInformation.reason;

  const reasonForRequestI18nKey =
    order.request.reasonForRequest &&
    getReasonForRequestI18nKey(order.request.reasonForRequest.label);

  const reasonDetails = order.request.reasonDetails;

  return (
    <>
      <DefinitionList>
        {labelValuePair(t('requests:order.product'), name || '')}
        {order.product &&
          order.product.type === RequestServiceCategoryType.computer && (
            <>
              {labelValuePair(
                t('requests:order.requestReason'),
                t(reasonForRequestI18nKey),
              )}
            </>
          )}
        {reasonDetails &&
          labelValuePair(t('requests:order.returnDetails'), reasonDetails)}
      </DefinitionList>
      <DefinitionList>
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
