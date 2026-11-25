import styled from 'styled-components';
import { Box, Typography } from '@lumos/core';

/**
 * StyledShareFeedbackTitle give style to Share Feedback title
 */
export const StyledShareFeedbackTitle = styled(Typography).attrs(_ => ({
  kind: 'h5',
}))`
  color: ${props => props.theme.colors.primary[1]};
  padding-left: ${props => props.theme.space[5]}px;
  padding-right: ${props => props.theme.space[5]}px;
`;

/**
 * StyledShareFeedbackMessage give style to Share Feedback message
 */
export const StyledShareFeedbackMessage = styled(Typography).attrs(_ => ({
  kind: 'body1',
}))`
  color: ${props => props.theme.colors.grayScale[12]};
  padding-left: ${props => props.theme.space[5]}px;
  padding-right: ${props => props.theme.space[5]}px;
`;

/**
 * StyledShareFeedbackDisclaimer give style to Share Feedback disclaimer
 */
export const StyledShareFeedbackDisclaimer = styled(Typography).attrs(_ => ({
  kind: 'body3',
}))`
  color: ${props => props.theme.colors.grayScale[12]};
  padding-left: ${props => props.theme.space[5]}px;
  padding-right: ${props => props.theme.space[5]}px;
`;

/**
 * StyledShareFeedbackContainer give style to Share Feedback message container
 */
export const StyledShareFeedbackContainer = styled(Box)`
  background-color: ${props => props.theme.colors.grayScale[1]};
  padding: ${props => props.theme.space[3]}px;
  margin: ${props => props.theme.space[5]}px;
  height: 190px;
`;
