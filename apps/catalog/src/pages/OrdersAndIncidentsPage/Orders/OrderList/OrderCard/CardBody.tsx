import React from 'react';
import { MyRequests_myRequests_items as Order } from 'graphql/queries/gqlTypes/MyRequests';
import { useTranslation } from 'react-i18next';
import { getReasonForRequestI18nKey } from 'pages/OrdersAndIncidentsPage/utils';
import {
  ClosingStatus,
  RequestServiceCategoryType,
} from 'gqlTypes/globalTypes';
import { WideCard } from 'components/WideCard';
import ShowFor from 'components/ShowFor';
import HorizontalLine from 'components/HorizontalLine';

type CardBodyProps = Pick<Order, 'request' | 'product' | 'trackingDetails'>;

const CardBody: React.FC<CardBodyProps> = ({
  request,
  product,
  trackingDetails,
}) => {
  const { t } = useTranslation(['requests', 'enums']);
  const unknown = t(`common:unknown`);
  const { closingInformation, orderNumber, reasonForRequest } = request;

  return (
    <>
      <WideCard.Field label={t('order.orderNumber')} value={orderNumber} />
      {product && product.type !== RequestServiceCategoryType.gcom && (
        <WideCard.Field
          label={t('order.price')}
          value={('price' in product && product.price) || unknown}
        />
      )}
      {reasonForRequest && (
        <WideCard.Field
          label={t('order.requestReason')}
          value={t(getReasonForRequestI18nKey(reasonForRequest.label))}
        />
      )}
      {trackingDetails && (
        <WideCard.Field
          label={`${trackingDetails.carrierName} ${t('order.tracking')}`}
          value={trackingDetails.number}
          url={trackingDetails.url || undefined}
        />
      )}

      {closingInformation &&
        closingInformation.status !== ClosingStatus.Completed && (
          <>
            <ShowFor mobile>
              <HorizontalLine />
            </ShowFor>
            <WideCard.Field
              label={t(`order.reasonLabel.${closingInformation.status}`)}
              value={closingInformation.reason || ''}
              newLineOnMobile
            />
          </>
        )}
    </>
  );
};

export default CardBody;
