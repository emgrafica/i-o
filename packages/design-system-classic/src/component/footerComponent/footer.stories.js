import { Col} from 'antd';
import React from 'react';
import Footer from './footer';

export default {
  title: 'i-o/Footer/Footer',
  component: Footer
};

const Template = (args) => <Footer {...args} />;

export const FooterComponent = Template.bind({});
Footer.args = {
};
FooterComponent.parameters = {
  design: {
    type: 'figma',
    url: ''
  }

};
