import React from 'react';
import TopNav from './topNav';

export default {
  title: 'i-o/Card',
  component: TopNav,
};

const Template = (args) => <TopNav {...args} />;

export const TopNavInfo = Template.bind({});
TopNav.args = {};
TopNavInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 