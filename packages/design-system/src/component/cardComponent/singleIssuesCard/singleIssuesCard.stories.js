import React from 'react';
import SingleIssuesCard from './singleIssuesCard';

export default {
  title: 'i-o/Card/SingleIssuesCard',
  component: SingleIssuesCard
};

const Template = (args) => <SingleIssuesCard {...args} />;

export const SingleIssuesCardComponent = Template.bind({});
SingleIssuesCard.args = {
};
