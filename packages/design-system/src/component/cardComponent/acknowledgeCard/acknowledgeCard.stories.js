import React from 'react';
import AcknowledgeCard from './acknowledgeCard';

export default {
    title: 'i-o/Card/AcknowledgeCard',
    component: AcknowledgeCard
};

const Template = (args) => <AcknowledgeCard {...args}/>;
export const AcknowledgeCardInfo = Template.bind({});
AcknowledgeCard.args = {};