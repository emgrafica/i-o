/**
 * Top level container props
 * @remarks When no gutters are specified, the default theme
 * gutters will be used.
 */
export interface GridLayoutProps {
  /**
   * Space between columns
   */
  columnGutters?: number;
  /**
   * Space between rows
   */
  rowGutters?: number;
  /**
   * Reverse the order of the rows
   * @remarks Useful when need to reverse the order of the rows
   *  in different screen width.
   *  @default false
   */
  reverse?: boolean;
}

/**
 * Styles to make gutter when in no-gutters mode.
 * @private
 */
export interface RowGutterStyles {
  marginX?: string;
  marginBottom?: string;
}

/**
 * Internal context
 * @private
 */
export type GridLayoutContext = Pick<
  GridLayoutProps,
  'columnGutters' | 'rowGutters'
>;
