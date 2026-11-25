import { Footer } from '@lumos/core';
import styled from 'styled-components';

/** Styling for Lumos Footer */
export const LumosFooter = styled(Footer)`
  background-color: ${props => props.theme.colors.secondary[1]};
  min-height: 60px;
  border-top: none;
  &::before {
    content: none;
  }
`;
/** Styling for Copyright in Lumos Footer */
export const Copyright = styled(Footer.Copyright)`
  width: auto;
  margin-bottom: 4px;
  @media screen and (max-width: 767px) {
    min-height: 20px;
  }
`;
