import styled from 'styled-components';
import { Card } from '@lumos/core';
import { ICardProps } from '@lumos/core/lib/components/Card/Card';

export const StyledCard = styled<
  React.FC<ICardProps & { smBreakpoint: boolean }>
>(Card)`
  ${({ smBreakpoint, theme }) => `
    cursor: ${smBreakpoint ? 'pointer' : 'default'};
    border-color: ${theme.colors.state.active};
  `}
`;
