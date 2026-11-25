import React from 'react';
import SelectBox from './select';

export default {
  title: 'i-o/Input',
  component: SelectBox,
};
    
const Template = (args) => <SelectBox {...args} />;

export const SelectBoxInfo = Template.bind({});
SelectBox.args = {};
// SelectBoxInfo.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=2580%3A69'
//   }
// };
 