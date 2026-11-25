import React from "react";
import EditComment from "./editComment";

export default {
  title: "i-o/EditComment",
  component: EditComment,
};

const Template = (args) => <EditComment {...args} />;

export const EditCommentComponent = Template.bind({});
EditComment.args = {};
