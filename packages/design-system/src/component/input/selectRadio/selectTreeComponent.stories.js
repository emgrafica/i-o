import React from 'react';
import SelectTreeComponent from './selectTreeComponent';

export default {
  title: 'i-o/Input',
  component: SelectTreeComponent,
};
    
const Template = (args) => <SelectTreeComponent {...args} />;

export const SelectTreeComponentInfo = Template.bind({});
SelectTreeComponent.args = {};
// SelectBoxInfo.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=2580%3A69'
//   }
// };
 