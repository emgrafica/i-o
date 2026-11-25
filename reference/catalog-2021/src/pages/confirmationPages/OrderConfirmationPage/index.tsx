import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import ShippingSummary from '../../checkoutPages/components/ShippingSummary';
import ProductDetails from '../../checkoutPages/components/ProductDetails';
import OrderDetails from '../../checkoutPages/components/OrderDetails';
import CsatSurvey from 'components/CsatSurvey';
import {
  isCatalogCheckout,
  getCatalogItemClass,
} from '../../checkoutPages/utils';
import {
  useReplacementInfo,
  useReportBrokenInfo,
  useSetReplacementInfo,
  useSetReportBrokenInfo,
} from '../../../store/apollo/store/hooks';
import { useCart, useReportMissingInfo } from 'store';
import CheckoutConfirmationPageTemplate from '../templates/CheckoutConfirmationPageTemplate';
import ReportBrokenOrderDetails from 'pages/checkoutPages/components/ReportBrokenOrderDetails';
import { CheckoutTypes } from 'pages/CatalogPage/utils';

/**
 *  Order confirmation page
 */
const OrderConfirmationPage: React.FC = () => {
  const { t } = useTranslation();

  const {
    orderNumber,
    catalogItem: itemData,
    requestConfigOptions: requestConfigData,
    checkoutType,
    userData,
    shippingInfo,
    billedToUser,
    businessJustification,
    sku,
    carrier,
    plan,
    features,
  } = useLocation().state;

  const replacementInfo = useReplacementInfo();
  const reportBrokenInfo = useReportBrokenInfo();
  const setReplacementInfo = useSetReplacementInfo();
  const setReportBrokenInfo = useSetReportBrokenInfo();
  const [reportMissingInfo, setReportMissingInfo] = useReportMissingInfo();
  const [cart, setCart] = useCart(userData.userId);

  const exitWorkflow = () => {
    if (replacementInfo) {
      setReplacementInfo(null);
    }
    if (reportBrokenInfo) {
      setReportBrokenInfo(null);
    }
    if (reportMissingInfo) {
      setReportMissingInfo(null);
    }
    if (cart) {
      setCart({ items: [] });
    }
  };

  React.useEffect(() => {
    return () => {
      exitWorkflow();
    };
    /* eslint-disable */
  }, []);

  const orderDetails = [
    {
      label: t('pages:request.checkout.requestedFor'),
      value: `${userData.firstName} ${userData.lastName}`,
    },
    ...(CheckoutTypes.GCom && billedToUser
      ? [
          {
            label: t('pages:request.checkout.billedTo'),
            value: `${billedToUser.firstName} ${billedToUser.lastName}`,
            checkoutType: CheckoutTypes.GCom,
          },
        ]
      : []),
    {
      label: t('pages:request.checkout.reasonForRequest'),
      value: requestConfigData.requestReason,
    },
    {
      label: t('common:businessJustification'),
      value: businessJustification,
    },
    {
      label: t('checkout:reportBroken.orderDetails.reasonForReturn'),
      value: requestConfigData.returnReason,
    },
    {
      label: t('pages:request.checkout.deviceUsage'),
      value: requestConfigData.deviceUsage,
    },
    {
      label: t('common:incidentNumber'),
      value: requestConfigData.incidentNumber,
    },
    {
      label: t('common:situationDetails'),
      value: requestConfigData.situationDetails,
    },
    {
      label: t('common:nextSteps'),
      value: requestConfigData.nextSteps,
    },
    {
      label: t('common:pickupInstructions'),
      value: requestConfigData.pickupInstructions,
    },
  ];
  const productDetails = [
    {
      label: t('common:plugType'),
      value: requestConfigData.plugType,
    },
    {
      label: t('common:keyboard'),
      value: requestConfigData.keyboardLanguage,
    },
    {
      label: t('common:replacedDevice'),
      value: replacementInfo && replacementInfo.productName,
    },
    {
      label: t('pages:request.mobility.mobilityDetails.carrier'),
      value: carrier,
    },
    {
      label: t('pages:request.mobility.mobilityDetails.plan'),
      value: plan,
    },
    {
      label: t('pages:request.mobility.mobilityDetails.features'),
      value: features,
    },
  ];

  const orderSummary = (
    <>
      {isCatalogCheckout(checkoutType) ? (
        <ProductDetails
          catalogItemImage={itemData.catalogItemImage}
          catalogItemName={itemData.catalogItemName}
          description={itemData.description}
          details={productDetails}
          productSku={sku}
        />
      ) : (
        <ProductDetails
          productMessage={t('pages:request.checkout.replacementMessage')}
          flex={1}
        />
      )}
      {!reportBrokenInfo && <OrderDetails details={orderDetails} flex={1} />}
      {reportBrokenInfo && <ReportBrokenOrderDetails />}
      {shippingInfo && Object.values(shippingInfo).length > 0 ? (
        <ShippingSummary {...shippingInfo} />
      ) : null}
    </>
  );
  return (
    <CheckoutConfirmationPageTemplate
      title={t('pages:request.checkout.header.titleSuccess')}
      subtitle={t('pages:request.checkout.header.subtitleSuccess')}
      alertMessage={t('common:orderSuccess', { orderNumber })}
      orderSummary={orderSummary}
      survey={
        <CsatSurvey
          ticketId={orderNumber}
          catalogClass={getCatalogItemClass(checkoutType)}
        />
      }
    />
  );
};

export default OrderConfirmationPage;
