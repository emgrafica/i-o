import styled from 'styled-components';
import { Button } from '@lumos/core';

/** Styling for primary action button */
export const PrimaryActionButton = styled(Button).attrs(_ => ({
  kind: 'primary',
}))`
  display: flex;
  justify-content: center;
  min-width: 140px;
  height: 42px;
  > img {
    margin-right: 8px;
  }
`;
