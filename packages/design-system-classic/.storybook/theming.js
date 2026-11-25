// .storybook/YourTheme.js

import { create } from '@storybook/theming';
import logo from '../src/assets/icons/dxc-blacklogo.svg';
export default create({
  base: 'light',
  brandTitle: 'DXC',
  brandUrl: 'https://www.dxc.technology/',
  brandImage: logo,
});