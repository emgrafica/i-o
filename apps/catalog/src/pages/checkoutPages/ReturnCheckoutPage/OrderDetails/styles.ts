import { Typography, Box } from '@lumos/core';
import styled from 'styled-components';

export const StyledHeader = styled(Typography).attrs({
  kind: 'h5',
})`
  color: ${props => props.theme.colors.secondary[1]};
  text-transform: capitalize;
`;

export const StyledContent = styled(Typography).attrs({
  kind: 'body1',
})`
  color: ${props => props.theme.colors.secondary[1]};
  overflow-wrap: break-word;
  word-wrap: break-word;
`;

export const StyledBox = styled(Box)`
  padding-top: '24px';
`;
