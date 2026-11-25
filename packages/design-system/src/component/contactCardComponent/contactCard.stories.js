import React from 'react';
import ContactCard from './contactCard';

export default {
  title: 'i-o/Contact Card',
  component: ContactCard,
};

const Template = (args) => <ContactCard {...args} />;

export const contactCardComponent = Template.bind({});
ContactCard.args = {};
contactCardComponent.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 