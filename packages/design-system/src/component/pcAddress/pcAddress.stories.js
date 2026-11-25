import React from 'react';
import PCAddress from './pcAddress';

export default {
  title: 'i-o/PCAddress',
  component: PCAddress,
};

const Template = (args) => <PCAddress {...args} />;

export const PCAddressInfo = Template.bind({});
PCAddress.args = {};
PCAddressInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 