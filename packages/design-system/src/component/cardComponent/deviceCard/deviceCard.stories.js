import React from 'react';
import DeviceCard from './deviceCard';
import { Grid } from '@material-ui/core';
export default {
  title: 'i-o/Card/Device Card',
  component: DeviceCard,
  decorators: [
    (DeviceCard) => (
        <Grid xs={4}>
            <DeviceCard/>
        </Grid>
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
  pc_state:'ELIGIBLE_FOR_REFRESH',
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
  pc_state:'PREPARING_DEVICE',
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
  pc_state:'DEVICE_IN_TRANSIT',
};

toBeReturnDeviceCard.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/GuxGvKlR4K4h2e1jbzj0r0?node-id=1924%3A439'
  }

};

