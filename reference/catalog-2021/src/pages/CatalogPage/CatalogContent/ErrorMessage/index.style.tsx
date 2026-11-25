import styled from 'styled-components';
import { ErrorOutline } from '@material-ui/icons';
import { Typography, Box } from '@lumos/core';

interface StyledLoadingError {
  breakpoint: number;
}
export const StyledLoadingError = styled(Typography).attrs(
  ({ breakpoint }: StyledLoadingError) => ({
    kind: breakpoint < 2 ? 'body3' : 'body1',
    fontSize: breakpoint < 3 ? '16px' : breakpoint < 4 ? '18px' : '25px',
  }),
)<StyledLoadingError>`
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
    font-size: ${({ breakpoint }) =>
      breakpoint < 3 ? '24px' : breakpoint < 4 ? '24px' : '35px'};
  }
`;

export const ErrorIcon = styled(ErrorOutline)`
  ${({ theme }) => `
    color: ${theme.colors.state.danger};
  `}
`;
