/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-designs'],
  framework: { name: '@storybook/react-vite', options: {} },
  staticDirs: ['../public'],
  docs: { autodocs: 'tag' },
  // vite.config.js is set up for library builds; Storybook needs a normal app build.
  viteFinal: async config => {
    if (config.build) {
      delete config.build.lib;
      if (config.build.rollupOptions) delete config.build.rollupOptions.external;
    }
    return config;
  }
};
export default config;
