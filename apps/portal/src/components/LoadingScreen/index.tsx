import React from 'react';
import { Box, Loader, Grid } from '@lumos/core';

/**
 * Props for the LoadingScreen icon
 **/
interface LoadingScreenProps {
  loaderSize?: 'sm' | 'lg' | 'md';
  /**
   * To allow styled-components to extend the styling of the outer container.
   */
  className?: string;
}

/**
 * Generic loading screen. Displays a loading animation.
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({
  loaderSize,
  ...props
}) => (
  <Grid
    height="100%"
    alignItems="center"
    justifyContent="center"
    data-testid="loading"
    {...props}
  >
    <Box>
      <Loader size={loaderSize || 'md'} />
    </Box>
  </Grid>
);

export default LoadingScreen;
