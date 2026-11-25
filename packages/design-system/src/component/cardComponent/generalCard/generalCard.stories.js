import React from 'react';
import GeneralCard from './generalCard';

export default {
  title: 'i-o/GeneralCard',
  component: GeneralCard,
};
    
const Template = (args) => <GeneralCard {...args} />;

export const GeneralCardInfo = Template.bind({});
GeneralCard.args = {};