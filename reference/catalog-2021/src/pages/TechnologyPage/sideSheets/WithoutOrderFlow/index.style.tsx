import styled from 'styled-components';
import { Typography, Grid, Box } from '@lumos/core';

export const StyledGrid = styled(Grid)`
  margin-top: 60px;
  justify-content: flex-end;
`;

export const StyledContainer = styled(Box)`
  padding-top: 60px;
`;

export const StyledHeader = styled(Typography).attrs({
  kind: 'h5',
})`
  color: ${props => props.theme.colors.primary[1]};
`;

export const StyledContent = styled(Typography).attrs({
  kind: 'body1',
})`
  color: ${props => props.theme.colors.secondary[1]};
`;
