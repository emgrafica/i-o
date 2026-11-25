import React from 'react';
import AcknowledgeDialog from './acknowledgeDialog';

export default {
    title: 'i-o/Acknowledge',
    component: AcknowledgeDialog
};

const Template = (args) => <AcknowledgeDialog {...args}/>;
export const AcknowledgeDialogComponent = Template.bind({});
AcknowledgeDialog.args = {};