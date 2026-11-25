import styled from 'styled-components';
import { Card, Typography, Box, Grid, Button } from '@lumos/core';
import { Device } from 'utils/useDevice';

type DeviceProp = {
  device: Device;
};

type ExpandedProp = {
  expanded: boolean;
};

const gutter: Record<Device, number> = {
  [Device.Ultrawide]: 36,
  [Device.Desktop]: 36,
  [Device.Tablet]: 24,
  [Device.Mobile]: 16,
};

const multiplier: Record<Device, number> = {
  [Device.Ultrawide]: 4,
  [Device.Desktop]: 4,
  [Device.Tablet]: 6.3,
  [Device.Mobile]: 0,
};

export const StyledCard = styled(Card)<DeviceProp>`
  margin-top: 0;
  border-color: ${p => p.theme.colors.grayScale[12]};
  margin-bottom: ${p => p.theme.space[5]}px;
  ${p =>
    p.device !== Device.Mobile
      ? `
  width: calc(100% + ${gutter[p.device] * multiplier[p.device]}px);
  margin-left: calc(${gutter[p.device]}px - 100px);
  margin-right: calc(${gutter[p.device]}px - 100px);
  `
      : `
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  `}
`;

export const CardInner = styled(Grid)<DeviceProp>`
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  ${p =>
    p.device !== Device.Mobile
      ? `
      flex-direction: row;
      justify-content: center;
      align-items: center;
  `
      : ''}
`;

const getMarginRight = (bp: Device) => {
  switch (bp) {
    case Device.Ultrawide:
      return 32;
    case Device.Desktop:
      return 32;
    case Device.Tablet:
      return 20;
    default:
      return 12;
  }
};

export const CardTitle = styled(Typography)<DeviceProp>`
  color: ${p => p.theme.colors.secondary[0]};
  margin: 0 ${p => getMarginRight(p.device)}px 0 0;
`;

export const ImageWrapper = styled(Box)<DeviceProp>`
  width: ${p => (p.device !== Device.Mobile ? 75 : 34)}px;
  margin-right: ${p => (p.device >= Device.Desktop ? 18 : 8)}px;
`;

export const BannerProductImage = styled.img`
  width: 100%;
  height: auto;
`;

export const DetailLabel = styled(Typography)`
  color: ${p => p.theme.colors.secondary[0]};
  margin: 0 8px 0 0;
  font-weight: 600;
`;

export const DetailValue = styled(Typography)`
  color: ${p => p.theme.colors.secondary[0]};
  margin: 0;
`;

export const DeviceInfoRow = styled(Grid)`
  align-items: center;
  margin-bottom: 8px;
`;

export const DeviceTitle = styled(Typography)<DeviceProp & ExpandedProp>`
  color: ${p => p.theme.colors.secondary[0]};
  margin: 0 12px 0 0;
  max-width: ${p => (p.device === Device.Mobile ? 200 : 210)}px;
  ${p =>
    p.device === Device.Mobile && !p.expanded
      ? `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
  `
      : ''}
`;

export const CollapseTrigger = styled(Button)`
  position: absolute;
  right: -10px;
  bottom: -11px;
  margin: 0;
  font-size: 24px;
  padding: 8px;
  box-shadow: none;
  &,
  &:hover,
  &:focus,
  &:active {
    border-color: transparent;
  }
`;

export const ExtraDeviceInfo = styled(Grid)<DeviceProp>`
  ${p =>
    p.device === Device.Mobile
      ? `
    border-top: 1px solid ${p.theme.colors.grayScale[5]};
    margin-top: ${p.theme.space[2]}px;
    padding: ${p.theme.space[2]}px 0 0;
  `
      : ``}

  ${p =>
    p.device < Device.Desktop
      ? `
    flex-direction: column;
    align-items: flex-start;
  `
      : `
    flex-direction: row;
    align-items: center;
  `}

  & > ${DeviceInfoRow}:not(:last-child) {
    margin-right: ${p => (p.device >= Device.Desktop ? 32 : 0)}px;
  }
`;

export const CollapseContainer = styled.div<DeviceProp>`
  width: ${p => (p.device === Device.Mobile ? '100%' : 'auto')};
  padding-top: 8px;
`;
