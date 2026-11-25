import { create } from '@storybook/theming';

// Storybook UI chrome: monochrome to match the tokens (brand = #000000).
export default create({
  base: 'light',
  brandTitle: 'i-o Design System',
  brandUrl: 'https://github.com/emgrafica/io-design-system',
  colorPrimary: '#000000',
  colorSecondary: '#000000',
  fontBase: '"Open Sans", Helvetica, Arial, sans-serif'
});
