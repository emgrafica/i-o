import styled from 'styled-components';
import { Box, Grid, Typography } from '@lumos/core';

export const StyledHeader = styled(Typography).attrs({
  kind: 'subtitle1',
})`
  color: ${props => props.theme.colors.secondary[0]};
  display: inline-block;
  white-space: nowrap;
`;

export const StyledContent = styled(Typography).attrs({
  kind: 'body2',
})`
  color: ${props => props.theme.colors.secondary[0]};
`;

export const StyledContainer = styled(Box)`
  flex: 1;
`;

export const NoHeaderContainer = styled(StyledContainer)`
  margin-top: 20px;
`;

export const StyledGrid = styled(Grid)`
  display: flex;
  margin-bottom: ${({ theme }) => theme.space[11]}px;
`;
