import styled from 'styled-components';
import { Grid } from '@lumos/core';

/**
 * StyledCloseButtonContainer is a container for Share Feedback close button
 */
export const StyledCloseButtonContainer = styled(Grid).attrs(_ => ({
  justifyContent: 'flex-end',
}))`
  padding-top: ${props => props.theme.space[6]}px;
  padding-left: ${props => props.theme.space[5]}px;
  padding-right: ${props => props.theme.space[5]}px;
`;
