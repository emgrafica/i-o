import React from 'react';
import Resolved from './resolvedComponent';

export default {
    title: 'i-o/Resolved',
    component: Resolved
};

const Template = (args) => <Resolved {...args}/>;
export const ResolvedInfo = Template.bind({});
Resolved.args = {};