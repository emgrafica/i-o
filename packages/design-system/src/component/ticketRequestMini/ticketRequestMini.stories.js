import React from 'react';
import TicketRequestMini from './ticketRequestMini';

export default {
  title: 'i-o/TicketRequestMini',
  component: TicketRequestMini,
};

const Template = (args) => <TicketRequestMini {...args} />;

export const TicketRequestMiniInfo = Template.bind({});
TicketRequestMiniInfo.args = {};
TicketRequestMiniInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 