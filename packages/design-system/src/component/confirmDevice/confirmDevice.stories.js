import React from 'react';
import ConfirmDevice from './confirmDevice';

export default {
  title: 'i-o/ConfirmDevice',
  component: ConfirmDevice,
};

const Template = (args) => <ConfirmDevice {...args} />;

export const ConfirmDeviceInfo = Template.bind({});
ConfirmDevice.args = {};
ConfirmDeviceInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 