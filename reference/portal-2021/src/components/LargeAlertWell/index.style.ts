import styled from 'styled-components';
import { Box, Grid } from '@lumos/core';
import { Warning } from '@material-ui/icons';

export const AlertWellGrid = styled(Grid)`
  border: 1px solid;
  border-color: ${props => props.theme.colors.state.warning};
  padding: 0px 10px 0px 10px;
  flex-direction: row;
  margin-bottom: 16px;
`;

export const IconWrapper = styled(Box)`
  margin-top: auto;
  margin-bottom: auto;
  & > svg {
    font-size: 40px;
  }
`;

export const AlertWellIcon = styled(Warning)`
  ${({ theme }) => `
    color: ${theme.colors.state.warning};
  `}
`;

export const AlertWellMessageBox = styled(Box)`
  padding-left: 15px;
`;
