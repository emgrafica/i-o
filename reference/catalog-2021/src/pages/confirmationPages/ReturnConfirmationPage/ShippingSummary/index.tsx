import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  NoHeaderContainer,
  StyledContainer,
  StyledContent,
  StyledGrid,
  StyledHeader,
} from './styles';
import { ShippingFormDataProps } from 'components/ShippingForm/types';

/**
 *  Checkout Shipping Summary Details Section container
 */
const ShippingSummary: React.FC<ShippingFormDataProps> = props => {
  // Translations
  const { t } = useTranslation('addressForm');
  return (
    <StyledGrid>
      <StyledContainer>
        <StyledHeader>{t('returnAddress')}</StyledHeader>
        <StyledContent>{props.name}</StyledContent>
        <StyledContent>{props.company}</StyledContent>
        <StyledContent>{props.phone}</StyledContent>
      </StyledContainer>
      <NoHeaderContainer>
        <StyledContent>{props.address1}</StyledContent>
        <StyledContent>{props.address2}</StyledContent>
        <StyledContent>
          {`${props.city}, ${props.state} ${props.zip}`}
        </StyledContent>
        <StyledContent>{props.country}</StyledContent>
      </NoHeaderContainer>
      <StyledContainer>
        <StyledHeader>{t('additionalInformation')}</StyledHeader>
        <StyledContent>{props.additionalDeliveryInfo}</StyledContent>
      </StyledContainer>
    </StyledGrid>
  );
};

export default ShippingSummary;
