import styled from 'styled-components';
import { Box } from '@lumos/core';
import React from 'react';

export const StyledXlWideCenterColumn = styled(Box)`
  grid-column: 2 / span 10;
  -ms-grid-column: 3;
  -ms-grid-column-span: 19;
`;

export const StyledXlCenterColumn = styled(Box)`
  grid-column: 3 / span 8;
  -ms-grid-column: 5;
  -ms-grid-column-span: 15;
`;
export const StyledXlLeftColumn = styled(Box)`
  grid-column: 2 / span 5;

  -ms-grid-column: 3;
  -ms-grid-column-span: 9;
`;

export const StyledXlLeftColumnSecondRow = styled(StyledXlLeftColumn)`
  grid-row: 2 / span 1;

  -ms-grid-row: 3;
  -ms-grid-row-span: 1;
`;
export const StyledXlRightColumn = styled(Box)`
  grid-column: 7 / span 5;
  -ms-grid-column: 13;
  -ms-grid-column-span: 9;
`;
// prettier-ignore
export const StyledXlGrid = styled(Box)`
  width: 100%;
  max-width: 1392px;
  padding: 0 24px;
  padding-top: 60px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, auto) 

  display: -ms-grid;
  /* prettier-ignore */
  -ms-grid-columns: 1fr (24px 1fr)[11];
`;

export const StyledContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

export const StyledXlGrid4Tracks = styled(Box)`
  width: 100%;
  height: 100%;
  max-width: 500px;
  padding: 0 24px;
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(4, 1fr);

  display: -ms-grid;
  /* prettier-ignore */
  -ms-grid-columns: 1fr (24px 1fr)[3];
`;

export const StyledXl4CenterColumn = styled(Box)`
  grid-column: 1 / span 4;
  -ms-grid-column: 1;
  -ms-grid-column-span: 7;
`;

export const StyledSMCenterColumn = styled(Box)`
  grid-column: 1 / span 12;
  -ms-grid-column: 1;
  -ms-grid-column-span: 23;
`;

interface ColumnProps {
  start: number;
  span: number;
}
const Column: React.FC<ColumnProps> = props => <Box {...props} />;
export const StyledColumn = styled(Column)`
  position: relative;
  grid-column: ${({ start, span }) => `${start} / span ${span}`};
  -ms-grid-column: ${({ start }) => start * 2 - 1};
  -ms-grid-column-span: ${({ span }) => span * 2 - 1};
`;
