import styled from 'styled-components';
import { Box, Typography } from '@lumos/core';

export const StyledActionContainerBox = styled(Box as any)`
  ${({ theme }) => `
    border-left: 1px solid #58595B;
    height: ${theme.space[13]}px;
    margin-top: ${theme.space[6]}px;
  `}
`;

export const StyledActionBox = styled(Box as any)`
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

export const LinkHover = styled(Box as any)`
  display: initial;
  ${({ theme }) => `
    color: ${theme.colors.primary[0]};
  `}
  font-weight: 600;
  cursor: pointer;
  &:hover,
  &:focus {
    color: #3e037d;
  }
`;

const DEFAULT_WHITE_BOX_HEIGHT = 100;
// eslint-disable-next-line
export const StyledWhiteBox = styled(Box as any)<{
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
  border-radius: 12px;
  background-color: #eceef1;
  padding: ${({ padding }) => (padding ? padding : `0px`)};
`;
