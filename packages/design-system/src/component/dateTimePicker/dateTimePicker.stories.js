import React from 'react';
import DateTimePicker from './dateTimePicker';

export default {
  title: 'i-o/DateTimePicker',
  component: DateTimePicker,
};

const Template = (args) => <DateTimePicker {...args} />;

export const DateTimePickerInfo = Template.bind({});
DateTimePicker.args = {};
DateTimePickerInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 