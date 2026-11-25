import React from 'react';
import RotateFloatButton  from './rotateFloatButton';



export default {
    title: 'i-o/Button/Rotate Float Button',
    component: RotateFloatButton
}


const Template = (args) => <RotateFloatButton {...args} />;

// ***********************************
// *   01) Normal State.
// ***********************************
export const RotateFloatButtonComponent = Template.bind({});
RotateFloatButtonComponent.storyName = 'Rotate Float Button';
RotateFloatButtonComponent.args = {

};