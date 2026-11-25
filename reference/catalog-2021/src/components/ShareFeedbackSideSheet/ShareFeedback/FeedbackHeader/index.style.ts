import styled from 'styled-components';
import { Typography, Grid } from '@lumos/core';
import { TextsmsOutlined } from '@material-ui/icons';

/**
 * StyledShareFeedbackContainer give style to Share Feedback header icon
 */
export const StyledShareFeedbackIcon = styled(TextsmsOutlined).attrs(_ => ({
  fontSize: 'large',
}))`
  ${({ theme }) => `
    color: ${theme.colors.primary[1]};
  `}
`;

/**
 * StyledShareFeedbackTitle give style to Share Feedback header title
 */
export const StyledShareFeedbackTitle = styled(Typography).attrs(_ => ({
  kind: 'h5',
}))`
  color: ${props => props.theme.colors.primary[1]};
  margin-top: 0;
  padding-left: ${props => props.theme.space[3]}px;
`;

/**
 * StyledShareFeedbackTitle give style to Share Feedback header container
 */
export const StyledShareFeedbackContainer = styled(Grid).attrs(_ => ({
  flex: '1',
}))`
  padding-top: ${props => props.theme.space[9]}px;
  padding-left: ${props => props.theme.space[5]}px;
`;
