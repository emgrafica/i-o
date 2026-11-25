import React from 'react';
import EmptyCard from './emptyCard';

export default {
  title: 'i-o/Card',
  component: EmptyCard,
};

const Template = (args) => <EmptyCard {...args} />;

export const EmptyCardExamble = Template.bind({});
EmptyCard.args = {
};
EmptyCardExamble.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EWof1O4DQ4gLEt0cmLwFdD)?node-id=6442%3A70747'
  }

};
