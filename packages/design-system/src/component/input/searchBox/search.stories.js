import React from 'react';
import SearchBox from './search';

export default {
  title: 'i-o/Input',
  component: SearchBox,
};
    
const Template = (args) => <SearchBox {...args} />;

export const SearchBoxInfo = Template.bind({});
SearchBox.args = {};