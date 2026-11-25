import React, { FC, useState } from 'react';
import { Grid, Collapsible } from '@lumos/core';
import { ExpandLessRounded, ExpandMoreRounded } from '@material-ui/icons';
import {
  StyledCard,
  BannerProductImage,
  DetailLabel,
  DetailValue,
  CardTitle,
  ImageWrapper,
  DeviceInfoRow,
  DeviceTitle,
  CollapseTrigger,
  ExtraDeviceInfo,
  CardInner,
  CollapseContainer,
} from './styled';
import noImageComputer from 'assets/images/noimage_computer.png';
import useLocaleDate from 'utils/useLocaleDate';
import { useTranslation } from 'react-i18next';
import useDevice, { Device } from 'utils/useDevice';

export type ReplacementBannerProps = {
  /**
   * ID of the device being replaced
   */
  id: string | null;

  /**
   * URL for the image
   */
  image: string | null;
  /**
   * Name of the device that is being replaced
   */
  productName: string | null;
  /**
   * Serial number for the device being replaced
   */
  serialNumber: string | null;
  /**
   * Usage of the device being replaced
   */
  usage: string | null;
  /**
   * The expiration date of the device being replaced
   */
  expires: number | null;
};

/**
 * Banner that is show at the top of the Catalog, Computer Details Page, and Checkout Page when the user is in a Replacement flow
 * @param {ReplacementBannerProps} props props for ReplacementBanner
 */
const ReplacementBanner: FC<ReplacementBannerProps> = ({
  productName,
  image,
  serialNumber,
  usage,
  expires,
}) => {
  const { t } = useTranslation();
  const device = useDevice();
  const [expanded, setExpanded] = useState(device !== Device.Mobile);
  const unknownText = t(`common:unknown`);
  const expiresText = useLocaleDate(expires);

  return (
    <StyledCard rounded hasFullBorder device={device}>
      <CardInner device={device}>
        <Grid alignItems="center">
          <CardTitle
            kind={device >= Device.Desktop ? 'h5' : 'body1'}
            device={device}
          >
            {t('common:replacing')}
          </CardTitle>
          <ImageWrapper device={device}>
            <BannerProductImage
              src={image || noImageComputer}
              alt={productName || t('common:product')}
            />
          </ImageWrapper>
          <DeviceTitle
            kind={device >= Device.Desktop ? 'body1' : 'body2'}
            device={device}
            expanded={expanded}
          >
            {productName}
          </DeviceTitle>
        </Grid>
        {/* Needed for collapsible content to use full width of card */}
        <CollapseContainer device={device}>
          <Collapsible expand={expanded}>
            <ExtraDeviceInfo device={device}>
              <DeviceInfoRow>
                <DetailLabel
                  kind={device >= Device.Desktop ? 'body1' : 'body2'}
                >
                  {t('common:serialNumber')}:
                </DetailLabel>
                <DetailValue kind="body1">
                  {serialNumber || unknownText}
                </DetailValue>
              </DeviceInfoRow>
              <DeviceInfoRow>
                <DetailLabel
                  kind={device >= Device.Desktop ? 'body1' : 'body2'}
                >
                  {t('common:usage')}:
                </DetailLabel>
                <DetailValue kind="body1">{usage || unknownText}</DetailValue>
              </DeviceInfoRow>
              <DeviceInfoRow>
                <DetailLabel
                  kind={device >= Device.Desktop ? 'body1' : 'body2'}
                >
                  {t('common:expires')}:
                </DetailLabel>
                <DetailValue kind="body1">
                  {expiresText || unknownText}
                </DetailValue>
              </DeviceInfoRow>
            </ExtraDeviceInfo>
          </Collapsible>
        </CollapseContainer>
        {device === Device.Mobile && (
          <CollapseTrigger
            kind="secondary"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ExpandLessRounded /> : <ExpandMoreRounded />}
          </CollapseTrigger>
        )}
      </CardInner>
    </StyledCard>
  );
};

export default ReplacementBanner;
