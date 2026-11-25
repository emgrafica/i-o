import React from 'react';
import DeleteAttachment from './deleteAttachmentModal';

export default {
    title: 'i-o/DeleteAttachment',
    component: DeleteAttachment
};

const Template = (args) => <DeleteAttachment {...args}/>;
export const DeleteAttachmentInfo = Template.bind({});
DeleteAttachment.args = {};