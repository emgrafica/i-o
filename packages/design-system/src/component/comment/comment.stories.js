import React from 'react';
import Comment from './comment';

export default {
  title: 'i-o/Comment',
  component: Comment
}

const Template = (args) => <Comment {...args} />

export const CommentComponent = Template.bind({});
Comment.args = {};