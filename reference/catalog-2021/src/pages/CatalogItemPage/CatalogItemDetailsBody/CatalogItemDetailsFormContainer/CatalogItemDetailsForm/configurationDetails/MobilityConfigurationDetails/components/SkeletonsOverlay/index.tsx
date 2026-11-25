import React from 'react';
import { Box } from '@lumos/core';
import Skeleton from 'react-loading-skeleton';

/**
 * Props for SkeletonsOverlay
 */
export interface SkeletonsOverlayProps {
  isLoading: boolean;
  minHeight: string;
}

/**
 * Skeletons Overlay
 */
const SkeletonsOverlay: React.FC<SkeletonsOverlayProps> = ({
  children,
  isLoading,
  minHeight,
}) => {
  return (
    <Box
      minHeight={minHeight}
      style={{
        position: 'relative',
      }}
    >
      {isLoading && (
        <Box
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            background: 'white',
          }}
        >
          <Box
            paddingTop={{
              xxs: '21px',
              xs: '21px',
              sm: '21px',
              md: '21px',
              lg: '45px',
              xl: '45px',
              xxl: '45px',
            }}
            width={{ xxs: '100%', md: '76%', lg: '59%' }}
          >
            <Skeleton width="100%" height="24px" />
          </Box>
          <Box paddingTop="17px" width={{ xxs: '80%', md: '61%', lg: '47%' }}>
            <Skeleton width="100%" height="24px" />
          </Box>
          <Box
            paddingTop="17px"
            paddingBottom={{
              xxs: '0px',
              lg: '41px',
            }}
            width={{ xxs: '100%', md: '76%', lg: '59%' }}
          >
            <Skeleton width="100%" height="24px" />
          </Box>
        </Box>
      )}
      <Box paddingLeft="2px">{children}</Box>
    </Box>
  );
};

export default SkeletonsOverlay;
