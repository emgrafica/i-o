import styled from 'styled-components';
import { ErrorOutline } from '@material-ui/icons';
import { Typography, Box } from '@lumos/core';

interface StyledLoadingError {
  breakpoint: number;
}
export const StyledLoadingError = styled(Typography).attrs(() => ({
  kind: 'body3',
  fontSize: '16px',
}))<StyledLoadingError>`
  color: ${props => props.theme.colors.state.danger};
  line-height: 24px;
  margin-left: 13px;
  margin-right: 13px;
  text-align: left;
`;

export const IconWrapper = styled(Box)<{ breakpoint: number }>`
  margin-top: auto;
  margin-bottom: auto;
  & > svg {
    font-size: '22px';
  }
`;

export const ErrorIcon = styled(ErrorOutline)`
  ${({ theme }) => `
    color: ${theme.colors.state.danger};
  `}
`;
