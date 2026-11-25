import React from 'react';
import MyOpenCard from './myOpenCard';

export default {
  title: 'i-o/Card/MyOpenCard',
  component: MyOpenCard
};

const Template = (args) => <MyOpenCard {...args} />;

export const MyOpenCardComponent = Template.bind({});
MyOpenCard.args = {
};
