import React from 'react';
import SupportCard from './supportCard';

export default {
    title: 'i-o/SupportCard',
    component: SupportCard
};

const Template = (args) => <SupportCard {...args}/>;
export const SupportCardComponent = Template.bind({});
SupportCard.args = {};