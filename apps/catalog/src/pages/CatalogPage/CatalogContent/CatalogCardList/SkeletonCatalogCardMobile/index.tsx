import { Box } from '@lumos/core';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonCatalogCardMobile: React.FC = () => {
  return (
    <Box paddingTop="16px">
      <Skeleton width="100%" height="150px" />
    </Box>
  );
};

export default SkeletonCatalogCardMobile;
