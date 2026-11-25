import React from 'react';
import SeeMoreCard from './seeMoreCard';

export default {
  title: 'i-o/Card',
  component: SeeMoreCard,
};

const Template = (args) => <SeeMoreCard {...args} />;

export const SeeMoreCardInfo = Template.bind({});
SeeMoreCard.args = {};
SeeMoreCardInfo.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=1933%3A93964'
  }
};
 