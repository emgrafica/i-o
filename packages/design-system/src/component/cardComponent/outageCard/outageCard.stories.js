import React from 'react';
import OutageCard from './outageCard';

export default {
  title: 'i-o/Card/OutageCard',
  component: OutageCard
};

const Template = (args) => <OutageCard {...args} />;

export const OutageCardComponent = Template.bind({});
OutageCard.args = {
};
