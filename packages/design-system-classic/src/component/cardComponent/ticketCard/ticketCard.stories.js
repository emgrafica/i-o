import React from 'react';
import TicketCard from './ticketCard';

export default {
  title: 'i-o/Card',
  component: TicketCard,
};

const Template = (args) => <TicketCard {...args} />;

export const TicketCardInfo = Template.bind({});
TicketCard.args = {};
TicketCardInfo.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=2580%3A69'
  }
};
 