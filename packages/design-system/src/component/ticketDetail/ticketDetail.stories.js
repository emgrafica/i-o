import React from 'react';
import TicketDetail from './ticketDetail';

export default {
  title: 'i-o/TicketDetail',
  component: TicketDetail,
};

const Template = (args) => <TicketDetail {...args} />;

export const TicketDetailInfo = Template.bind({});
TicketDetail.args = {};
TicketDetailInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 