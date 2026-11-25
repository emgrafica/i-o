import styled from 'styled-components';
import { Box, Grid, Typography } from '@lumos/core';
import { Warning } from '@material-ui/icons';

export const StyledOverlayAlertBox = styled(Box)`
  ${({ theme }) => `
    padding-left: ${theme.space[2]}px;
    padding-right: ${theme.space[2]}px;
    padding-bottom: ${theme.space[2]}px;
  `}
`;

export const StyledOverlayAlertGrid = styled(Grid)`
  ${({ theme }) => `
    align-items: center;
    padding-left: ${theme.space[2]}px;
    padding-right: ${theme.space[2]}px;
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

export const StyledOverlayGrid = styled(Grid)`
  justify-content: space-between;
  width: 100%;
`;

export const StyledPopoverGrid = styled(Grid)`
  ${({ theme }) => `
    flex-direction: row;
    align-items: center;
    color: ${theme.colors.primary[2]};
    :hover {
      color: ${theme.colors.primary[1]};
    }
  `}
`;
