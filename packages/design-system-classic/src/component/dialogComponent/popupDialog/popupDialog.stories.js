import React from 'react';
import popupDialog from './popupDialog';

export default {
  title: 'i-o/Card',
  component: popupDialog,
};

const Template = (args) => <popupDialog {...args} />;

export const popupDialogExamble = Template.bind({});
popupDialog.args = {
};
popupDialogExamble.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EWof1O4DQ4gLEt0cmLwFdD)?node-id=4154%3A14128'
  }

};
