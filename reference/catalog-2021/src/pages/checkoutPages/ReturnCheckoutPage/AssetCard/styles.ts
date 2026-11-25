import { Typography, Grid, Box } from '@lumos/core';
import styled from 'styled-components';

export const StyledImageWrapper = styled(Box)`
  margin: ${props => props.theme.space[4]}px;
  padding-top: ${props => props.theme.space[0]}px;
`;

export const AssetNameHeader = styled(Typography).attrs({
  kind: 'body1',
})`
  color: ${props => props.theme.colors.primary[1]};
  margin: '0px';
  margin-bottom: ${props => props.theme.space[5]}px;
`;

export const StyledWrapper = styled(Grid)`
  padding-bottom: ${props => props.theme.space[4]}px;
`;

export const StyledHeader = styled(Typography).attrs({
  kind: 'subtitle1',
})`
  font-weight: bold;
  color: ${props => props.theme.colors.primary[1]};
  margin-bottom: 0;
  margin-right: ${props => props.theme.space[2]}px;
`;

export const StyledContent = styled(Typography).attrs({
  kind: 'body2',
})`
  color: ${props => props.theme.colors.primary[1]};
  margin-top: 0;
  margin-top: 0;
  margin-bottom: 0;
`;

export const StyledGrid = styled(Grid)`
  flex-direction: column;
  margin-left: ${props => props.theme.space[6]}px;
  padding-top: ${props => props.theme.space[4]}px;
`;
