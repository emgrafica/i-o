// @ts-nocheck
import { ThemeAlias } from 'styled-components-in';

/**
 * Colors.
 */

const colors = {
  accent: ['#FFB600', '#00B5E2'],
  gradient: [
    ['#056ACA', '#053362'],
    ['#FFB600', '#FF8300'],
  ],
  grayScale: [
    '#FFFFFF',
    '#F8F8F9',
    '#F2F2F2',
    '#E6E6E6',
    '#CCCCCC',
    '#BCBEC0',
    '#A7A9AC',
    '#939598',
    '#808285',
    '#6D6E71',
    '#58595B',
    '#414042',
    '#000000',
  ],
  state: {
    success: '#2B9702',
    warning: '#F96806',
    danger: '#CE0E10',
    active: '#056ACA',
    productPrimary: '#5F249F',
    active: '#00B5E2',
    onBlur: '#1E2F46',
    background: '#F4FAFF',
  },
  background: {
    enabled: '#FFFFFF',
    hover: '#F4FAFF',
    focus: '#E9F4FE',
    disabled: '#F2F2F2',
  },
  button: {
    primary: {
      enabled: '#7229c0',
      hover: '#5f249f',
      pressed: '#7229c0',
    },
    accent: {
      enabled: '#FFB600',
      hover: '#FF8300',
      pressed: '#A4541C',
    },
  },
  form: {
    text: {
      label: {
        enabled: '#0A2543',
        disabled: '#BCBEC0',
      },
      input: {
        placeholder: '#7E8BA5',
        enabled: '#0A2543',
        disabled: '#BCBEC0',
      },
      menu: {
        enabled: '#0A2543',
        hover: '#053362',
      },
    },
    input: {
      border: {
        enabled: '#053362',
        focus: '#056ACA',
        disabled: '#808285',
      },
      background: {
        enabled: '#F4FAFF',
        disabled: '#F2F2F2',
      },
    },
  },
  navigation: {
    dark: '#0A2543',
    bright: '#056ACA',
    medium: '#E9F4FE',
    light: '#F4FAFF',
    text: {
      dark: '#0A2543',
      light: '#F4FAFF',
      disabled: '#BCBEC0',
    },
  },
  primary: ['#5F249F', '#3E037D', '#7229C0', '#977DFF', '#E5DEEF', '#F6F3FC'],
  // secondary: ['#1F2020, #737373, #197FE5', '#07539F', '#D81E5B', '#F57803', '#FDDEE2', '#E9E0F7', '#FFE5CD', '#E0F3E2'],
  secondary: ['#1F2020', '#737373', '#BCBEC0'],
  impact: ['#0870D8', '#ffffff', '#0A5DB1'],
  backgroundColor: ['#FFFFFF', '#F4FAFF', '#F2F2F2'],
};

/**
 * Fonts.
 */
const fonts = {
  primary: 'Open Sans',
};

/**
 * Font sizes.
 *
 * Default values are based on a x1.125 scale.
 */
const fontSizes = [14.3, 16, 18, 20.25, 22.8, 25.6, 28.8, 32.4, 36.5];

/**
 * Spacing. For Padding, Margins
 */
const space = [0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 112, 128];

/**
 * Min container sizes
 */
const sizes = {
  xxs: '0px',
  xs: '375px',
  sm: '600px',
  md: '768px',
  lg: '1280px',
  xl: '1440px',
  xxl: '1920px',
};

/**
 * Radii.
 */
const radii = [0, 3, 6];

/**
 * Z-indices.
 */
const zIndices = [0, 100, 1000, 10000, 100000];

/**
 * Line heights.
 */
const lineHeights = [1, 1.25, 1.285, 1.44];

/**
 * Shadow values.
 */
const shadows = {
  xxs: '0 1px 1px 0 rgba(183, 183, 183, 0.3)',
  xs: '0 1px 1px 0 rgba(183, 183, 183, 0.3)',
  sm: '0 1px 3px 0 rgba(136, 136, 136, 0.3)',
  md: '0 2px 4px 0 rgba(0,0,0,0.1), 0 4px 8px 0 rgba(0,0,0,0.15)',
  lg:
    '0 2px 4px 0 rgba(0,0,0,0.05), 0 4px 5px 0 rgba(0,0,0,0.16), 0 7px 10px 0 rgba(0,0,0,0.18)',
  xl: '0 2px 4px 0 rgba(0,0,0,0.12), 0 14px 14px 0 rgba(0,0,0,0.12)',
  xxl: '0 3px 5px 0 rgba(0,0,0,0.12), 0 24px 16px 0 rgba(0,0,0,0.1)',
};

/**
 * Breakpoints
 */
const breakpoints: ThemeAlias = [
  '0px',
  '375px',
  '600px',
  '768px',
  '1280px',
  '1440px',
  '1920px',
];
[breakpoints.xxs] = breakpoints;
[, breakpoints.xs] = breakpoints;
[, , breakpoints.sm] = breakpoints;
[, , , breakpoints.md] = breakpoints;
[, , , , breakpoints.lg] = breakpoints;
[, , , , , breakpoints.xl] = breakpoints;
[, , , , , , breakpoints.xxl] = breakpoints;

/**
 * Gutters (in pixels)
 * Determines how much space to add between and
 * outside of grid columns;
 * Keys should match that of breakpoints
 */
const gutters: ThemeAlias = [16, 16, 16, 24, 24, 24, 60];
[gutters.xxs] = gutters;
[, gutters.xs] = gutters;
[, , gutters.sm] = gutters;
[, , , gutters.md] = gutters;
[, , , , gutters.lg] = gutters;
[, , , , , gutters.xl] = gutters;
[, , , , , , gutters.xxl] = gutters;

const DefaultLumosTheme = {
  colors,
  fonts,
  fontSizes,
  sizes,
  space,
  zIndices,
  radii,
  lineHeights,
  shadows,
  breakpoints,
  gutters,
};

export default DefaultLumosTheme;
