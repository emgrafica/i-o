import React from 'react';
import Comments from './comments';

export default {
  title: 'i-o/Comments',
  component: Comments
};

const Template = (args) => <Comments {...args} />;

export const CommentsComponent = Template.bind({});
Comments.args = {
};
