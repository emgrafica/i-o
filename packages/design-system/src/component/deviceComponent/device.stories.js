import React from 'react';
import Device from './device';

export default {
  title: 'i-o/Device',
  component: Device
};

const Template = (args) => <Device {...args} />;

export const DeviceComponent = Template.bind({});
Device.args = {
};
