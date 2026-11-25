import React from 'react';
import YourSoftware from './yourSoftware';

export default {
  title: 'i-o/YourSoftware',
  component: YourSoftware
}

const Template = (args) => <YourSoftware {...args} />

export const YourSoftwareInfo = Template.bind({});
YourSoftware.args = {};