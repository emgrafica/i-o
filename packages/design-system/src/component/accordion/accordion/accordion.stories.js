import React from 'react';
import Accordion from './accordion';

export default {
  title: 'i-o/Accordion',
  component: Accordion,
};
    
const Template = (args) => <Accordion {...args} />;

export const AccordionInfo = Template.bind({});
Accordion.args = {};