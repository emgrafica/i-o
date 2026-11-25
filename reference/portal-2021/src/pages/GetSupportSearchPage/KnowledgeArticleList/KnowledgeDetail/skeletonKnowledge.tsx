import { Box, Grid } from '@lumos/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonCard: React.FC = () => {
  return (
    <Box width="100%">
      <Grid flexDirection="row">
        <Box width="88px">
          <Skeleton height="60px" width="60px" />
        </Box>
        <Box width="100%">
          <Skeleton height="12px" />
          <Skeleton height="12px" />
          <Skeleton height="12px" />
        </Box>
      </Grid>
      <Box width="100%" marginY="12px">
        <Skeleton height="12px" />
        <Skeleton height="12px" />
      </Box>
    </Box>
  );
};

export default SkeletonCard;
