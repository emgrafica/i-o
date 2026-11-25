import React from 'react';
import MultipleCard from './multipleCard';

export default {
    title: 'i-o/Card',
    component: MultipleCard,
};

const Template = (args) => <MultipleCard {...args} />;

export const MultipleCardExamble = Template.bind({});
MultipleCard.args = {
};
MultipleCardExamble.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/EWof1O4DQ4gLEt0cmLwFdD?node-id=6296%3A28426'
    }

};
