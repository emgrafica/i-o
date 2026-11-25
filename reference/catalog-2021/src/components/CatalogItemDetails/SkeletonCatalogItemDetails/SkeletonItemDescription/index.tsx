import { Box } from '@lumos/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonItemDescriptionDetails: React.FC = () => {
  return (
    <Box>
      {/* Catalog item subtitle */}
      <Box paddingTop="40px">
        <Skeleton width="90%" height="8px" />
        <Box width={{ xxs: '85%', md: '46%', lg: '52%' }}>
          <Skeleton width="100%" height="8px" />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonItemDescriptionDetails;
