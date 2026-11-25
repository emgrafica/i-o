import React from 'react';
import Devices from './devices';

export default {
  title: 'i-o/Devices',
  component: Devices
};

const Template = (args) => <Devices {...args} />;

export const DeviceComponent = Template.bind({});
Devices.args = {
};
