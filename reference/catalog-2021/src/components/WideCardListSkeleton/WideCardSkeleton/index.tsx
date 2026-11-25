import { Box, Grid } from '@lumos/core';
import React from 'react';
import useDevice, { Device } from 'utils/useDevice';
import Skeleton from 'react-loading-skeleton';

/**
 * The Skeleton for pages using the WideCard component
 * The shape looks like:
 * [x xxxxx      xxx]
 */
export const WideCardSkeleton: React.FC = () => {
  const device = useDevice();
  const isMobile = device === Device.Mobile;

  return (
    <Grid
      box-sizing="border-box"
      height={isMobile ? '120px' : '80px'}
      width="100%"
      border="1px solid #f0f3f7"
      border-radius="3px"
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      justifyContent={isMobile ? 'center' : 'unset'}
      alignItems={isMobile ? 'unset' : 'center'}
      paddingX="28px"
      maxWidth="920px"
    >
      <Grid
        flexDirection="row"
        width="100%"
        alignItems="center"
        marginBottom={isMobile ? '10px' : '0'}
      >
        {/* first skeleton */}
        <Skeleton height="24px" width="24px" />
        {/* second skeleton */}
        <Box
          marginLeft="10px"
          width="100%"
          maxWidth={isMobile ? '100%' : '300px'}
        >
          <Skeleton height="16px" />
        </Box>
      </Grid>
      {/* Third skeleton */}
      <Box marginLeft={isMobile ? '0' : '10px'}>
        <Skeleton height="34px" width={isMobile ? '100%' : '157px'} />
      </Box>
    </Grid>
  );
};
