import { Box } from '@lumos/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonBilling: React.FC = () => {
  return (
    <Box
      paddingTop="16px"
      paddingBottom={{
        xxs: '105px',
      }}
      width={{ xxs: '100%', md: '100%', lg: '77%' }}
    >
      <Skeleton width="100%" height="10px" />
    </Box>
  );
};

export default SkeletonBilling;
