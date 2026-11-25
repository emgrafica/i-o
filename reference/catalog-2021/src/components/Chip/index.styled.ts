import styled from 'styled-components';
import { Grid, Typography, Box } from '@lumos/core';
import { CloseRounded } from '@material-ui/icons';

export const ChipContainer = styled(Grid)`
  background: ${p => p.theme.colors.primary[1]};
  border-radius: 3px;
  padding: 4px 24px 4px 4px;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 2px 3px 0 rgba(0, 0, 0, 0.2);
  margin: 0 2px;
`;

export const ChipText = styled(Typography).attrs({
  kind: 'subtitle3',
})`
  color: ${p => p.theme.colors.grayScale[0]};
`;

export const IconContainer = styled(Box)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 12px 12px;
  font-size: 1rem;
  cursor: pointer;
`;

export const CloseIcon = styled(CloseRounded).attrs({ fontSize: 'inherit' })`
  color: ${p => p.theme.colors.state.enabled};
  position: absolute;
  top: 3px;
  left: 3px;
`;
