import React from 'react';
import MultipleSelect from './multipleSelect';

export default {
  title: 'i-o/MultipleSelect',
  component: MultipleSelect,
};
    
const Template = (args) => <MultipleSelect {...args} />;

export const MultipleSelectInfo = Template.bind({});
MultipleSelect.args = {};
MultipleSelectInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 