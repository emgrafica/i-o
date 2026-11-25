import React from 'react';
import BannerCard from './bannerCard';

export default {
  title: 'i-o/Card',
  component: BannerCard,
};

const Template = (args) => <BannerCard {...args} />;

export const BannerCardExamble = Template.bind({});
BannerCard.args = {
};
BannerCardExamble.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EWof1O4DQ4gLEt0cmLwFdD)?node-id=3235%3A15680'
  }

};
