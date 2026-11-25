import styled from 'styled-components';
import { Box, Grid, Typography } from '@lumos/core';
import { Warning } from '@material-ui/icons';

export const StyledSubmissionErrorBox = styled(Box)`
  ${({ theme }) => `
    padding-left: 26px;
    padding-right: 26px;
    padding-bottom: ${theme.space[2]}px;
    padding-bottom: ${theme.space[4]}px;
  `}
`;

export const StyledSubmissionErrorGrid = styled(Grid)`
  ${({ theme }) => `
    align-items: center;
    padding: ${theme.space[2]}px;
    width: 1;
    background-color: rgba(255, 182, 0, .1);
  `}
`;

export const StyledIconGrid = styled(Grid)`
  ${({ theme }) => `
    margin-right: ${theme.space[3]}px;
    color: ${theme.colors.impact[1]};
  `}
`;

export const StyledWarningIcon = styled(Warning)`
  color: inherit;
`;

export const StyledTypography = styled(Typography)`
  ${({ theme }) => `
    margin: ${theme.space[0]}px;
  `}
`;
