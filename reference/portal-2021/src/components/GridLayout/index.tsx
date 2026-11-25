import React, { createContext, useContext } from 'react';
import { Container, Row as LumosRow, Col as LumosCol } from '@lumos/core';
import { IColProps } from '@lumos/core/lib/components/RowCol/Col';
import { IRowProps } from '@lumos/core/lib/components/RowCol/Row';
import { ThemeContext } from 'styled-components';
import { RowGutterStyles, GridLayoutContext, GridLayoutProps } from './types';
import useDevice, { Device } from '../../utils/useDevice';
import { CenterBox } from './index.style';

const GridContext = createContext<GridLayoutContext | null>(null);

/**
 * Hook that returns a GridLayoutContext context
 * If null throw an error.
 *
 * @return GridLayoutContext
 */
export const useGridLayoutContext = (): GridLayoutContext => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error('Must be used within the "GridLayout"');
  }
  return context;
};

/**
 * Convert breakpoint to number
 * @remarks offset 1px from minimal screen width.
 * @param breakpoint - Lumos breakpoint theme variable.
 */
const parseBreakpoints = (breakpoint: string): number => {
  return parseInt(breakpoint, 10) - 1;
};

/**
 * Parent container that provides cross cutting props
 */
export const GridLayout: React.FC<GridLayoutProps> = ({
  columnGutters,
  rowGutters,
  reverse = false,
  children,
}) => {
  const theme = useContext(ThemeContext);

  const gridWidth = {
    [Device.Ultrawide]:
      parseBreakpoints(theme.breakpoints[4]) - theme.gutters[4] * 2,
    [Device.Desktop]:
      parseBreakpoints(theme.breakpoints[4]) - theme.gutters[4] * 2,
    [Device.Tablet]:
      parseBreakpoints(theme.breakpoints[2]) - theme.gutters[2] * 2,
    [Device.Mobile]:
      parseBreakpoints(theme.breakpoints[0]) - theme.gutters[0] * 2,
  };

  const gutterStyles =
    columnGutters === undefined
      ? {}
      : {
          className: 'no-gutters',
        };
  const context: GridLayoutContext = {
    columnGutters,
    rowGutters,
  };
  const device = useDevice();

  return (
    <CenterBox>
      <Container
        fluid
        flexDirection={reverse ? 'column-reverse' : 'column'}
        width="100%"
        maxWidth={columnGutters === undefined ? gridWidth[device] : '100%'}
        {...gutterStyles}
      >
        <GridContext.Provider value={context}>{children}</GridContext.Provider>
      </Container>
    </CenterBox>
  );
};

/**
 * Lumos Row Wrapper
 * @remarks Provides simplified API usage.
 */
export const Row: React.FC<IRowProps> = ({ children, ...rest }) => {
  const { columnGutters, rowGutters } = useGridLayoutContext();

  const gutterStyles: RowGutterStyles =
    columnGutters !== undefined
      ? {
          marginX: `${columnGutters / 2}px`,
        }
      : {};

  if (rowGutters !== undefined) {
    gutterStyles.marginBottom = `${rowGutters}px`;
  }

  return (
    <LumosRow {...rest} {...gutterStyles}>
      {children}
    </LumosRow>
  );
};

/**
 * Lumos Col Wrapper
 * @remarks Provides simplified API usage.
 */
export const Col: React.FC<IColProps> = ({ children, ...rest }) => {
  const { columnGutters } = useGridLayoutContext();

  const gutterStyles =
    columnGutters !== undefined
      ? {
          paddingX: `${columnGutters / 2}px`,
        }
      : {};

  return (
    <LumosCol {...rest} {...gutterStyles}>
      {children}
    </LumosCol>
  );
};
