import styled from 'styled-components';
import { Box } from '@lumos/core';
import {
  STICKY_HEADER_HEIGHT,
  MOBILE_STICKY_HEADER_HEIGHT,
} from '../../constants';

export const StyledStickyBox = styled(Box)`
  ${({ theme }) => `
    margin: ${theme.space[0]}px;
    padding: ${theme.space[2]}px ${theme.space[2]}px;
    position: fixed;
    overflow: hidden;
    z-index: ${theme.zIndices[4]};
    top: ${theme.space[0]};
    width: 100vw;
    min-height: ${STICKY_HEADER_HEIGHT}px;
    max-height: ${MOBILE_STICKY_HEADER_HEIGHT}px;
    background-color:  ${theme.colors.secondary[4]};
  `}
`;
