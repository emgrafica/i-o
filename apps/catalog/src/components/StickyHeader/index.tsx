import React from 'react';
import { StyledStickyBox } from './index.style';

/**
 * Will display its content sticked to the top of the app
 */
const StickyHeader: React.FC = ({ children }) => (
  <StyledStickyBox>{children}</StyledStickyBox>
);

export default StickyHeader;
