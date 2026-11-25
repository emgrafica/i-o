import React from 'react';
import EyeBrow from './eyeBrow';

export default {
  title: 'i-o/EyeBrow',
  component: EyeBrow,
};
    
const Template = (args) => <EyeBrow {...args} />;

export const EyeBrowInfo = Template.bind({});
EyeBrow.args = {};