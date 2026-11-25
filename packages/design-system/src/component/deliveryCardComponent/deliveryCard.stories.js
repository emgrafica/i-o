import React from 'react';
import DeliveryCard from './deliveryCard';

export default {
  title: 'i-o/Delivery Card',
  component: DeliveryCard,
};

const Template = (args) => <DeliveryCard {...args} />;

export const deliveryCardComponent = Template.bind({});
DeliveryCard.args = {};
deliveryCardComponent.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 