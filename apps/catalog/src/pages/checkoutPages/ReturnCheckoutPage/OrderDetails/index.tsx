import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@lumos/core';

import noimageComputer from 'assets/images/noimage_computer.png';
import SectionHeader from 'components/SectionHeader';
import CancelModal from 'pages/TechnologyPage/CancelModal';
import AssetCard from '../AssetCard';
import { StyledBox, StyledContent, StyledHeader } from './styles';
import { ReturnCheckoutLocationState } from 'pages/TechnologyPage/types';
import { useReason } from 'pages/TechnologyPage/utils';
import { useCheckoutContext } from '..';

const OrderDetails: React.FC = () => {
  const { t } = useTranslation('technology');
  const { state } = useCheckoutContext();

  const location = useLocation<ReturnCheckoutLocationState>();
  const { reason, asset } = location.state;
  const { expires, productName, image, serialNumber, usage } = asset;

  const unknownText = t(`common:unknown`);

  const [isCancelModalOpen, setIsCancelModalOpen] = React.useState(false);
  const { content } = state;
  return (
    <Box>
      <SectionHeader title={t('checkout.orderDetails.header')} />
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
      <Box>
        <Typography kind="h6" color="secondary.1">
          {t('checkout.orderDetails.reason')}
        </Typography>
        <StyledContent>{useReason(reason.value)}</StyledContent>
        {reason.details && <StyledContent>{reason.details}</StyledContent>}
      </Box>

      <Box>
        <StyledHeader>{content.title}</StyledHeader>
        <StyledContent>{content.body}</StyledContent>
      </Box>

      {/* Checkout Cancel Modal */}
      <CancelModal
        isModalOpen={isCancelModalOpen}
        setIsModalOpen={setIsCancelModalOpen}
      />
    </Box>
  );
};

export default OrderDetails;
