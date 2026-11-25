import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid } from '@lumos/core';
import {
  AssetNameHeader,
  StyledContent,
  StyledGrid,
  StyledHeader,
  StyledImageWrapper,
  StyledWrapper,
} from './styles';
import useLocaleDate from 'utils/useLocaleDate';

export type AssetDetailsProps = {
  image?: string;
  productName?: string;
  serialNumber?: string;
  usage?: string;
  expires?: number | null;
};

/**
 * @param {*} props
 * @returns
 */
const AssetCard: React.FC<AssetDetailsProps> = ({
  image,
  productName,
  serialNumber,
  usage,
  expires,
}) => {
  const { t } = useTranslation();
  const unknownText = t(`common:unknown`);
  const formattedExpires = useLocaleDate(expires);

  return (
    <>
      <Grid flexDirection={{ xxs: 'column', md: 'row' }} paddingBottom={5}>
        <StyledImageWrapper>
          <img height="auto" width="181px" src={image} alt="asset record" />
        </StyledImageWrapper>
        <StyledGrid>
          <AssetNameHeader>{productName}</AssetNameHeader>
          <StyledWrapper>
            <StyledHeader>{t('common:serialNumber')}: </StyledHeader>
            <StyledContent>{serialNumber}</StyledContent>
          </StyledWrapper>
          <StyledWrapper>
            <StyledHeader>{t('common:usage')}:</StyledHeader>
            <StyledContent>{usage}</StyledContent>
          </StyledWrapper>
          <StyledWrapper>
            <StyledHeader>{t('common:expires')}:</StyledHeader>
            <StyledContent>{formattedExpires || unknownText}</StyledContent>
          </StyledWrapper>
        </StyledGrid>
      </Grid>
    </>
  );
};

export default AssetCard;
