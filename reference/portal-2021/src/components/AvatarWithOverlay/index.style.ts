import styled from 'styled-components';
import { Box } from '@lumos/core';

/**
 * StyledOverlay is a styled component that will render children on top of other components with a given position.
 */
export const StyledOverlay = styled(Box)`
  position: relative;
  height: 0px;
`;
