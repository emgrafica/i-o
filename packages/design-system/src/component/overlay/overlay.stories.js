import React from 'react';
import Overlay from './overlay';

export default {
  title: 'i-o/Overlay',
  component: Overlay
}

const Template = (args) => <Overlay {...args} />

export const OverlayComponent = Template.bind({});
Overlay.args = {};