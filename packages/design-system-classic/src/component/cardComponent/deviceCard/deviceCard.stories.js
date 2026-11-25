import { Col} from 'antd';
import React from 'react';
import DeviceCard from './deviceCard';

export default {
  title: 'i-o/Card/Device Card',
  component: DeviceCard,
  decorators: [
    (DeviceCard) => (
        <Col span={6}>
            <DeviceCard/>
        </Col>
    )
  ]
};

const Template = (args) => <DeviceCard {...args} />;

// ***********************************
// *   a) Refresh device card.
// ***********************************
export const RefreshDeviceCard = Template.bind({});
RefreshDeviceCard.storyName = 'Refresh Device Card';
RefreshDeviceCard.args = {
  pc_state:'REFRESH_AVAILABLE',
  processing: '100',
};

RefreshDeviceCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/EWof1O4DQ4gLEt0cmLwFdD?node-id=3445%3A206'
  }

};


// ***********************************
// *   a) Being refreshed device card.
// ***********************************
export const beingRefreshedDeviceCard = Template.bind({});
beingRefreshedDeviceCard.storyName = 'Being Refreshed Device Card';
beingRefreshedDeviceCard.args = {
  pc_state:'BEING_REFRESHED',
  processing: '0',
  is_new: false,
  kbNumber: 'KB0012103'
};

beingRefreshedDeviceCard.parameters = {
  design: {
    type: 'figma',
    url : 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=1924%3A439'
  }

};


// ***********************************
// *  c) To be return device card.
// ***********************************
export const toBeReturnDeviceCard = Template.bind({});
toBeReturnDeviceCard.storyName = 'Being Returned Device Card';
toBeReturnDeviceCard.args = {
  pc_state:'TO_BE_RETURNED',
  processing: '0',
  is_new: false,
  kbNumber: 'KB0012103'
};

toBeReturnDeviceCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=1924%3A439'
  }

};

