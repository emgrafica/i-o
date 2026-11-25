import React from 'react';
import UserInforCard from './userInforCard';

export default {
  title: 'i-o/Card',
  component: UserInforCard,
};

const Template = (args) => <UserInforCard {...args} />;

export const UserInformationCard = Template.bind({});
UserInforCard.args = {};
