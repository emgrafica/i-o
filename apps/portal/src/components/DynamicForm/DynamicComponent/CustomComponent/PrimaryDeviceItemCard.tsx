// @ts-nocheck
import React from 'react';
import { Box, Typography } from '@lumos/core';
import { IoItemDevice } from '@i-o/design-system';

export interface PrimaryDeviceItemCard {
  data: any;
}

const PrimaryDeviceItemCard: React.FC<PrimaryDeviceItemCard> = ({
  data,
  value,
  label,
  horizontal = true,
}) => {
  let deviceData = value ? value : data;
  deviceData.process_state = '';
  return (
    <Box>
      <Typography kind="body2" width="100%" fontSize="20px" marginY="10px">
        {label}
      </Typography>
      <IoItemDevice
        isShowAction={false}
        deviceData={deviceData}
        horizontal={horizontal}
      />
    </Box>
  );
};

export default PrimaryDeviceItemCard;
