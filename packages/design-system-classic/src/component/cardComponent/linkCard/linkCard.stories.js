import React from 'react';
import LinkCard from './linkCard';

export default {
  title: 'i-o/Card',
  component: LinkCard,
};

const Template = (args) => <LinkCard {...args} />;

export const LinkCardComponent = Template.bind({});
LinkCard.args = {
};
LinkCardComponent.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EWof1O4DQ4gLEt0cmLwFdD?node-id=4353%3A16421'
  }
};
