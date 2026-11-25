import React from 'react';
import HlxButton from './button';

export default {
  title: 'i-o/Input',
  component: HlxButton,
};
    
const Template = (args) => <HlxButton {...args} />;

export const HlxButtonInfo = Template.bind({});
HlxButton.args = {};