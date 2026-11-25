import React from 'react';
import DeviceInfoCard from './deviceInfoCard';

export default {
  title: 'i-o/Card',
  component: DeviceInfoCard,
};

const Template = (args) => <DeviceInfoCard {...args} />;

export const DeviceInfoCardExamble = Template.bind({});
DeviceInfoCard.args = {
};
DeviceInfoCardExamble.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EWof1O4DQ4gLEt0cmLwFdD?node-id=6296%3A28426'
  }

};
