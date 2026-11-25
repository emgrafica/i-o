import styled from 'styled-components';
import { Typography } from '@lumos/core';

/**
 * StyledNotMatchTypography
 */
export const StyledNotMatchTypography = styled(Typography).attrs(_ => ({
  kind: 'body1',
}))`
  color: ${props => props.theme.colors.primary[0]};
  font-size: ${props => props.theme.fontSizes[0]}px;
  text-transform: uppercase;
  margin: ${props => props.theme.space[2]}px;
`;
