import { Grid } from '@lumos/core';
import { IGridProps } from '@lumos/core/lib/components/Grid';
import styled from 'styled-components';

/**
 * Box container which houses the close icon for `Modal`
 */
// eslint-disable-next-line
export const CloseBox = styled(Grid)<
  IGridProps & React.HTMLProps<HTMLDivElement>
>`
  border: none;
  ${({ theme }) => `
      & > svg {
        color: ${theme.colors.state.enabled}
        font-size: ${theme.fontSizes[7]}px;
      }
    `}
  outline: none;
  &: hover {
    cursor: pointer;
  }
`;
