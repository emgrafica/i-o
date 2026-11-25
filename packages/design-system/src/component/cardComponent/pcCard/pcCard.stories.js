import React from 'react';
import PCCard from './pcCard';

export default {
    title: 'i-o/PCCard',
    component: PCCard
};

const Template = (args) => <PCCard {...args}/>;
export const PCCardComponent = Template.bind({});
PCCard.args = {};