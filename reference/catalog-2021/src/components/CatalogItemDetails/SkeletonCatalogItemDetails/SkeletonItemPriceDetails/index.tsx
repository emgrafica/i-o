import { Box } from '@lumos/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonCatalogPriceDetails: React.FC = () => {
  return (
    <Box>
      {/* Catalog item details, located below back button */}
      <Box marginTop="34px">
        <Box width={{ xxs: '65%', md: '28%', lg: '31%' }}>
          <Skeleton width="100%" height="20px" />
        </Box>
        <Box paddingTop="6px" width={{ xxs: '39%', md: '17%', lg: '19%' }}>
          <Skeleton width="100%" height="20px" />
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonCatalogPriceDetails;
