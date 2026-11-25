import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography } from '@lumos/core';
import ShippingSummary from './ShippingSummary';
import AssetCard from '../../checkoutPages/ReturnCheckoutPage/AssetCard';
import { StyledBox, StyledContent, StyledHeader, StyledLine } from './styles';
import noimageComputer from 'assets/images/noimage_computer.png';
import { useReason } from '../../TechnologyPage/utils';
import { TechnologyAssets_myTechnologyAssets_computers } from '../../TechnologyPage/queries/gqlTypes/TechnologyAssets';
import CheckoutConfirmationPageTemplate from '../templates/CheckoutConfirmationPageTemplate';

/**
 * Return confirmation page for technology return flow
 */
const ReturnConfirmationPage: React.FC = () => {
  const { t } = useTranslation('technology');
  const location = useLocation();
  const { reason, asset, pickupAddress, data, content } = location.state;
  const {
    expires,
    image,
    productName,
    serialNumber,
    usage,
  } = asset as TechnologyAssets_myTechnologyAssets_computers;
  const unknownText = t(`common:unknown`);

  const orderSummary = (
    <>
      <StyledBox>
        <StyledHeader>{t('checkout.orderDetails.asset')}</StyledHeader>
        {asset && (
          <AssetCard
            image={image || noimageComputer}
            productName={productName || unknownText}
            serialNumber={serialNumber || unknownText}
            usage={usage || unknownText}
            expires={expires}
          />
        )}
      </StyledBox>
      <StyledBox>
        <Typography kind="h6" color="secondary.1">
          {t('checkout.orderDetails.reason')}
        </Typography>
        <StyledContent>{useReason(reason.value)}</StyledContent>
        {reason.details && <StyledContent>{reason.details}</StyledContent>}
      </StyledBox>
      <StyledLine />
      <StyledHeader>{content.title}</StyledHeader>
      <StyledContent>{content.body}</StyledContent>
      <StyledLine />
      <ShippingSummary {...pickupAddress} />`
    </>
  );

  return (
    <CheckoutConfirmationPageTemplate
      title={t('orderConfirmation.title')}
      subtitle={t('orderConfirmation.subtitle')}
      alertMessage={t('common:orderSuccess', {
        orderNumber: data.createCatalogReturnOrder.requestId,
      })}
      orderSummary={orderSummary}
    />
  );
};

export default ReturnConfirmationPage;
