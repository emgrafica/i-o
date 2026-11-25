import styled from 'styled-components';
import { Box, Typography } from '@lumos/core';

export const StyledActionContainerBox = styled(Box)`
  ${({ theme }) => `
    border-left: 1px solid #58595B;
    height: ${theme.space[13]}px;
    margin-top: ${theme.space[6]}px;
  `}
`;

export const StyledActionBox = styled(Box)`
  text-align: right;
  margin-top: 0px;
  width: 100%;
`;

export const GetSupportTypography = styled(Typography).attrs(_ => ({
  kind: 'button',
}))`
  ${({ theme }) => `
    padding: ${theme.space[3]}px;
    margin: ${theme.space[2]}px;
    color: ${theme.colors.primary[1]};
  `}
`;

const DEFAULT_WHITE_BOX_HEIGHT = 100;
// eslint-disable-next-line
export const StyledWhiteBox = styled(Box)<{
  height?:
    | string
    | number
    | (string & {})
    | (string | number | (string & {}) | null)[]
    | {
        [x: string]: string | number | (string & {}) | undefined;
        [x: number]: string | number | (string & {}) | undefined;
      }
    | null
    | undefined;
  padding?:
    | string
    | number
    | (string & {})
    | (string | number | (string & {}) | null)[]
    | {
        [x: string]: string | number | (string & {}) | undefined;
        [x: number]: string | number | (string & {}) | undefined;
      }
    | null
    | undefined;
}>`
  width: 100%;
  height: ${({ height }) =>
    height ? height : `${DEFAULT_WHITE_BOX_HEIGHT}px`};
  flex-direction: column;
  opacity: 0.9;
  border-radius: 3px;
  background-color: #ffffff;
  padding: ${({ padding }) => (padding ? padding : `0px`)};
`;
