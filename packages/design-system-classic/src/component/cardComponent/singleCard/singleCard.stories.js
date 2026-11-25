import React from 'react';
import SingleCard from './singleCard';

export default {
    title: 'i-o/Card',
    component: SingleCard,
};

const Template = (args) => <SingleCard {...args} />;

export const SingleCardExamble = Template.bind({});
SingleCard.args = {
};
SingleCardExamble.parameters = {
    design: {
        type: 'figma',
        url: 'https://www.figma.com/file/EWof1O4DQ4gLEt0cmLwFdD?node-id=6296%3A28426'
    }

};
