import styled from 'styled-components';
import { Box } from '@lumos/core';

/**
 * Props for the LineClamper component
 **/
export interface ClampTextProps {
  /** The maximum number of lines to display **/
  maxLineCount: number;
}

/**
 * Clamps the number of lines displayed, based on the
 * lineCount prop. Adds and ellipsis when the text is
 * clamped
 **/
export const ClampText = styled(Box)<ClampTextProps>`
  display: -webkit-box;
  -webkit-line-clamp: ${props => props.maxLineCount};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;
