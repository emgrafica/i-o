import React from 'react';
import CommentComponent from './commentComponent';

export default {
  title: 'i-o/Content',
  component: CommentComponent,
};

const Template = (args) => <CommentComponent {...args} />;

export const CommentComponentExamble = Template.bind({});
CommentComponent.args = {
};
CommentComponentExamble.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EWof1O4DQ4gLEt0cmLwFdD?node-id=6420%3A2205'
  }

};
