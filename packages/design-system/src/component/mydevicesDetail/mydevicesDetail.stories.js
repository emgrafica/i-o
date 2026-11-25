import React from 'react';
import MydevicesDetail from './mydevicesDetail';

export default {
  title: 'i-o/MydevicesDetail',
  component: MydevicesDetail,
};

const Template = (args) => <MydevicesDetail {...args} />;

export const MydevicesDetailInfo = Template.bind({});
MydevicesDetail.args = {};
MydevicesDetailInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 