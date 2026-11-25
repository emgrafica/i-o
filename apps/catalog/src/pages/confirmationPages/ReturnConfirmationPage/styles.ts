import styled from 'styled-components';
import { Box, Typography } from '@lumos/core';

export const StyledHeader = styled(Typography).attrs({
  kind: 'h5',
})`
  color: ${props => props.theme.colors.secondary[1]};
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

export const StyledBoxColor = styled(StyledBox)`
  background-color: ${props => props.theme.colors.grayScale[1]};
  padding: 10px;
`;

export const StyledLine = styled(Box)`
  height: 1px;
  border: 0;
  color: ${props => props.theme.colors.secondary[1]};
  background-color: ${props => props.theme.colors.secondary[1]};
  margin-top: ${({ theme }) => theme.space[6]}px;
  margin-bottom: ${({ theme }) => theme.space[6]}px;
`;
