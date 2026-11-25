import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@lumos/core';
import unavailableTech from 'assets/images/Unavailable_tech.png';
import OrderStepper from './OrderStepper';
import { RequestStatusType } from 'gqlTypes/globalTypes';
import { MyRequests_myRequests_items as Order } from 'graphql/queries/gqlTypes/MyRequests';
import { SlimCardHeader } from 'pages/OrdersAndIncidentsPage/index.style';
import { ClampTitle, DateLabelSlim } from 'components';
import CardBody from './CardBody';
import { useLayoutEffect, useRef, useState } from 'react';
import ImageWithFallback from 'components/ImageWithFallback';
import { WideCard } from 'components/WideCard';

/**
 * Props for the request card component
 * requestItem: single request item from from GET_CATALOG_REQUESTS query
 * setViewDetails: Sets the request details to be displayed in the view details sidesheet
 * setIsViewDetailsOpen: sets open state for view details sidesheet
 */
export interface OrderCardProps {
  data: Order;
  isLoading?: boolean;
  onViewDetails: (order: Order) => void;
  onCancel: (order: Order) => void;
}

const getActionClickHandler = (cb: () => void) => {
  return () => {
    document.body.click();
    cb();
  };
};

const getElmHeight = (node: Element) => {
  const list = [
    'margin-top',
    'margin-bottom',
    'border-top',
    'border-bottom',
    'padding-top',
    'padding-bottom',
    'height',
  ];

  const style = window.getComputedStyle(node);
  return list
    .map(k => style.getPropertyValue(k))
    .filter(v => v !== '')
    .map(v => parseInt(v, 10))
    .reduce((prev, cur) => prev + cur, 0);
};

/**
 * Individual card component for each request item
 * @param props
 */
const OrderCard: React.FC<OrderCardProps> = ({
  data,
  isLoading,
  onCancel,
  onViewDetails,
}) => {
  const { t } = useTranslation('requests');
  const contentRef = useRef<HTMLDivElement>(null);

  // IE 11 is not able to handle minHeight properly in "relative" positioned
  // container, the following is an attempt to dynamically compute height.
  // IE needs special paddings - 24px.
  const [height, setHeight] = useState(179);
  useLayoutEffect(() => {
    const resizeHandler = () => {
      if (contentRef.current) {
        let height = 0;
        for (let i = 0; i < contentRef.current.children.length; i++) {
          height += getElmHeight(contentRef.current.children[i]);
        }

        // IE 11 special sauce
        // @ts-ignore
        if (!!window.MSInputMethodContext && !!document.documentMode) {
          height += 24;
        }
        setHeight(height);
      }
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  });

  const { request, product, trackingDetails } = data;
  const { closingInformation, submittedDate, status } = request;
  // show "submitted date" if closing date is not available.
  const date = closingInformation ? closingInformation.date : submittedDate;

  // show "Submitted" if it is not closed/cancelled/resolved
  const label = () => {
    switch (status) {
      case RequestStatusType.Cancelled:
      case RequestStatusType.Completed:
      case RequestStatusType.Declined:
        return t(`order.statuses.${status}`);
      default:
        return t('order.statuses.submitted');
    }
  };

  // show red for "cancelled", green for "closed" and "resolved", otherwise default.
  const color = () => {
    switch (status) {
      case RequestStatusType.Cancelled:
      case RequestStatusType.Declined:
        return 'state.danger';
      case RequestStatusType.Completed:
        return 'state.success';
      default:
        return 'secondary.0';
    }
  };

  const handleViewDetails = getActionClickHandler(() => onViewDetails(data));
  const handleCancel = getActionClickHandler(() => onCancel(data));

  const buttons = [
    <Button
      kind="primary"
      onClick={handleViewDetails}
      width={{ xxs: '100%', md: '134px' }}
      marginBottom="12px"
    >
      {t('common:viewDetails')}
    </Button>,
  ];

  // if cancelable, add cancel button to beginning of buttons array
  request.actions.cancelable &&
    buttons.unshift(
      <Button
        kind="secondary"
        onClick={handleCancel}
        width={{ xxs: '100%', md: '134px' }}
      >
        {t('common:cancel')}
      </Button>,
    );

  return (
    <WideCard.Template
      data-testid="order-card"
      loading={isLoading}
      minHeightDesktop={`${height}px`}
      minHeightTablet={`${height}px`}
      minHeightMobile={`${height}px`}
      thumbnail={
        <ImageWithFallback
          width="100%"
          src={
            product && ('image' in product ? product.image : unavailableTech)
          }
          fallbackSrc={unavailableTech}
          alt={t('order.imageAlt')}
        />
      }
      header={
        product && (
          <SlimCardHeader>
            <ClampTitle text={product.name} id={request.orderNumber} />
            <DateLabelSlim color={color()} label={label()} date={date} />
          </SlimCardHeader>
        )
      }
      body={
        <>
          {!request.closingInformation && <OrderStepper request={request} />}
          <CardBody
            request={request}
            product={product}
            trackingDetails={trackingDetails}
          />
        </>
      }
      buttons={buttons}
    />
  );
};

export default OrderCard;
