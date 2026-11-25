import React from 'react';
import Reopen from './reopenComponent';

export default {
    title: 'i-o/Reopen',
    component: Reopen
};

const Template = (args) => <Reopen {...args}/>;
export const ReopenInfo = Template.bind({});
Reopen.args = {};