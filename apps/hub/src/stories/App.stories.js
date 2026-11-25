import React from 'react';
import HomePage from '../pages/home';
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'i-o App',
  component: HomePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withDesign],
};

// export const Template = (args) => <Button {...args} />;
export const Home = (args) => <HomePage />;

Home.parameters = {
  design: {
    type: 'figma',
    // url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931',
    url: 'https://www.figma.com/file/jjPtq8705hVDR4777rDESZ?node-id=651%3A535'
  },
}