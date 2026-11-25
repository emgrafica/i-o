import React from 'react';
import GeneralDialog from './generalDialog';

export default {
    title: 'i-o/GeneralDialog',
    component: GeneralDialog
}

const Template = (args) => <GeneralDialog {...args}/>;
export const GeneralDialogComponent = Template.bind({});
GeneralDialog.args = {};