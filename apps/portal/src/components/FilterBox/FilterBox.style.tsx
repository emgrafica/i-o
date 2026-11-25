import styled, { css } from 'styled-components';

import {
  compose,
  color,
  ColorProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system';

import { Typography } from '@lumos/core';

export type FilterBoxType = TypographyProps &
  SpaceProps &
  ColorProps & { hasCheckbox?: boolean };

export const CategoryLabel = styled(Typography).attrs(
  ({ hasCheckbox, theme }: { hasCheckbox?: boolean; theme: any }) => ({
    fontSize: 12,
    fontWeight: 700,
    color: theme.colors.secondary[1],
    kind: 'subtitle1',
    marginLeft: hasCheckbox ? 1 : 0,
    lineHeight: '18px',
    width: '100%',
    wordBreak: 'break-all',
  }),
)<FilterBoxType>`
  :hover {
    cursor: pointer;
  }
  ${compose(typography, space, color)}
`;

export const Chevron = styled.svg.attrs(() => ({
  x: '0px',
  y: '0px',
  width: '24px',
  height: '24px',
  viewBox: '0 0 24 24',
  'enable-background': 'new 0 0 24 24',
  'xml:space': 'preserve',
  'stroke-width': 0.2,
}))`
  transition: transform 0.2s;
  cursor: pointer;
  transform: rotate(90deg);
  ${({ selected }: { selected: boolean }) =>
    selected &&
    css`
      transform: rotate(270deg);
    `}
  ${space}
`;

export const FilterItemLabel = styled(Typography).attrs(() => ({
  kind: 'label',
  fontSize: 12,
  padding: 1,
}))`
  :hover {
    cursor: pointer;
  }
`;
