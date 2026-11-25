import React from 'react';
import Shortcut from './shortcut';

export default {
    title: 'i-o/Shortcut',
    component: Shortcut
};

const Template = (args) => <Shortcut {...args}/>;
export const ShortcutComponent = Template.bind({});
Shortcut.args = {};