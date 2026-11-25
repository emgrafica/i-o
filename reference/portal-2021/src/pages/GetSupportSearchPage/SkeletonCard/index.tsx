import { Box, Grid } from '@lumos/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonCard: React.FC = () => {
  return (
    <Grid flexDirection="row" marginY="30px">
      <Box width="44px">
        <Skeleton height="32px" width="32px" circle={true} />
      </Box>
      <Box width="100%">
        <Skeleton height="8px" />
        <Skeleton height="8px" />
        <Skeleton height="8px" />
      </Box>
    </Grid>
  );
};

export default SkeletonCard;
