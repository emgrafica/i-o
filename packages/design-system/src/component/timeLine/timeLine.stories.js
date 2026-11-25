import React from 'react';
import TimeLine from './timeLine';

export default {
  title: 'i-o/TimeLine',
  component: TimeLine,
};

const Template = (args) => <TimeLine {...args} />;

export const TimeLineInfo = Template.bind({});
TimeLine.args = {};
TimeLineInfo.parameters = {
  design: {
    type: 'figma',
    url: ''
  }
};
 