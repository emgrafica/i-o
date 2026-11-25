import React from 'react';
import AutoComplete from './autoComplete';
export default {
  title: 'i-o/Input',
  component: AutoComplete,
};
    
const Template = (args) => <AutoComplete {...args} />;

export const AutoCompleteInfo = Template.bind({});
AutoComplete.args = {};