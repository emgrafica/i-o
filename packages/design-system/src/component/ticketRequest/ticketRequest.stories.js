import React from 'react';
import TicketRequest from './ticketRequest';

export default {
  title: 'i-o/TicketRequest',
  component: TicketRequest,
};

const Template = (args) => <TicketRequest {...args} />;

export const TicketRequestInfo = Template.bind({});
TicketRequest.args = {};
TicketRequestInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 