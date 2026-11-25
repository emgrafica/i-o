import '../src/index.css';
import '../design/tokens.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    options: { storySort: { order: ['Foundations', '*'] } }
  }
};
export default preview;
