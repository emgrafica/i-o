import React from 'react';
import Upload from './uploadComponent';

export default {
    title: 'i-o/Upload',
    component: Upload
};

const Template = (args) => <Upload {...args}/>;
export const UploadComponent = Template.bind({});
Upload.args = {};