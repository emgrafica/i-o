import styled from 'styled-components';
import { Box, Grid, Typography } from '@lumos/core';
import { Info } from '@material-ui/icons';

export const StyledCenteredFlexBox = styled(Grid)`
  justify-content: center;
  align-items: center;
`;

export const StyledDataBox = styled(Grid)`
  ${({ theme }) => `
    justify-content: center;
    align-items: center;
    height: ${theme.space[6]}px;
  `}
`;

export const StyledMobileDataBox = styled(Grid)`
  ${({ theme }) => `
    justify-content: center;
    align-items: center;
    height: ${theme.space[6]}px;
    font-size: ${theme.fontSizes[1]}px;
  `}
`;

export const StyledInfo = styled(Info)`
  ${({ theme }) => `
    color: ${theme.colors.primary[1]};
  `}
`;

export const StyledCenteredBox = styled(Box)`
  ${({ theme }) => `
    align-items: center;
    padding-right: ${theme.space[7]}px;
  `}
`;

export const StyledMobileCenteredBox = styled(Box)`
  ${({ theme }) => `
    align-items: center;
  `}
`;

export const StyledTypography = styled(Typography)`
  ${({ theme }) => `
    padding-Left: ${theme.space[3]}px;
  `}
`;

export const StyledMobileTypography = styled(Typography)`
  ${({ theme }) => `
    padding-Left: ${theme.space[1]}px;
    margin-bottom: 0px;
  `}
`;
