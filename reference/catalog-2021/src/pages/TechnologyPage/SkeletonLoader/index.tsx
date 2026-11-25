import React from 'react';
import { Box, Grid } from '@lumos/core';
import Skeleton from 'react-loading-skeleton';

/** Renders a skeleton loader to be used on the technology actions sidesheet */
const SkeletonLoader: React.FC = () => (
  <Grid flexDirection="column" marginY="64px">
    <Box maxWidth="226px">
      <Skeleton height="34px" />
    </Box>
    <Box width="100%" marginTop="26px">
      <Skeleton height="8px" />
      <Skeleton height="8px" />
    </Box>
    <Grid marginTop="50px" marginLeft="auto">
      <Skeleton height="34px" width="103px" />
    </Grid>
  </Grid>
);

export default SkeletonLoader;
