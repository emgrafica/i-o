import { Box, Grid } from '@lumos/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonChat: React.FC = () => {
  return (
    <Box paddingBottom="24px">
      <Grid display="inline-block">
        <Skeleton height="35px" width="35px" circle={true} />
        <Box paddingLeft="10px" paddingTop="5px">
          <Skeleton width="226px" height="20px" />
        </Box>
      </Grid>

      <Box paddingTop="20px">
        <Skeleton height="8px" width="404px" />
        <Skeleton height="8px" width="202px" />
        <Skeleton height="8px" width="404px" />
        <Skeleton height="8px" width="202px" />
      </Box>
    </Box>
  );
};

export default SkeletonChat;
