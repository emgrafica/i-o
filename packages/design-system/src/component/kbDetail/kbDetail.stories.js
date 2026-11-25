import React from 'react';
import KBDetail from './kbDetail';

export default {
  title: 'i-o/KBDetail',
  component: KBDetail,
};

const Template = (args) => <KBDetail {...args} />;

export const KBDetailInfo = Template.bind({});
KBDetail.args = {};
KBDetailInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 