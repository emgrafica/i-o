import React from 'react';
import DetailLostAndStolen from './detailLostAndStolen';

export default {
  title: 'i-o/DetailLostAndStolen',
  component: DetailLostAndStolen,
};

const Template = (args) => <DetailLostAndStolen {...args} />;

export const DetailLostAndStolenInfo = Template.bind({});
DetailLostAndStolen.args = {};
DetailLostAndStolenInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 