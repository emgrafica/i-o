import React from 'react';
import Attachment from './attachmentComponent';

export default {
    title: 'i-o/Attachment',
    component: Attachment
};

const Template = (args) => <Attachment {...args}/>;
export const AttachmentComponent = Template.bind({});
Attachment.args = {};