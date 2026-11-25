import React from 'react';
import Device, { listState } from './device';


export default {
    title: 'i-o/Card/Device',
    component: Device
}


const Template = (args) => <Device {...args} />;


// ***********************************
// *   01) Normal State.
// ***********************************
export const DeviceComponent = Template.bind({});
DeviceComponent.storyName = '01) Normal State';
DeviceComponent.args = {
    state: listState.NORMAL_STATE,
    nameCard: 'Primary device',
    device:{
        deviceBrand: 'Dell',
        deviceStatus: 'Ready for Refresh',
        deviceImage: "https://thanhgiac.com.vn/upload/gallery/surface-laptop-go-128gb-5421.jpg",
        deviceName: "XPS 15 Inspiron",

        configuration: {
            serialNumber: "DFJSFL3443SDF",
            since: "January 2018",
            lastActive: '6 days ago',
            osLicence: "Windows 8 Pro",
          },
    }
};


// ***********************************
// *   02) Normal State - Image unavailable
// ***********************************
export const DeviceComponentwithNotEligible = Template.bind({});
DeviceComponentwithNotEligible.storyName = '02) Normal State - Image unavailable';
DeviceComponentwithNotEligible.args = {
    state: listState.NORMAL_STATE,
    nameCard: 'Primary device',
    device:{
        deviceBrand: 'Dell',
        deviceStatus: 'Ready for Refresh',
        deviceImage: "",
        deviceName: "XPS 15 Inspiron",

        configuration: {
            serialNumber: "DFJSFL3443SDF",
            since: "January 2018",
            lastActive: '6 days ago',
            osLicence: "Windows 8 Pro",
          },
    }
};


// ***********************************
// *   03) Refresh eligible
// ***********************************
export const DeviceComponentwithRefreshEligible = Template.bind({});
DeviceComponentwithRefreshEligible.storyName = '03) Refresh eligible';
DeviceComponentwithRefreshEligible.args = {
    state: listState.REFRESH_ELIGIBLE_STATE,
    nameCard: 'Primary device',
    device:{
        deviceBrand: 'Dell',
        deviceStatus: 'Ready for Refresh',
        deviceImage: "https://thanhgiac.com.vn/upload/gallery/surface-laptop-go-128gb-5421.jpg",
        deviceName: "XPS 15 Inspiron",

        configuration: {
            serialNumber: "DFJSFL3443SDF",
            since: "January 2018",
            lastActive: '6 days ago',
            osLicence: "Windows 8 Pro",
          },
    }
};


// ***********************************
// *   04) Pending Return
// ***********************************
export const DeviceComponentwithPendingReturn = Template.bind({});
DeviceComponentwithPendingReturn.storyName = '04) Pending Return';
DeviceComponentwithPendingReturn.args = {
    state: listState.RETURN_STATE,
    nameCard: 'Primary device',
    device:{
        deviceBrand: 'Dell',
        deviceStatus: 'Ready for Refresh',
        deviceImage: "https://thanhgiac.com.vn/upload/gallery/surface-laptop-go-128gb-5421.jpg",
        deviceName: "XPS 15 Inspiron",

        configuration: {
            serialNumber: "DFJSFL3443SDF",
            since: "January 2018",
            lastActive: '6 days ago',
            osLicence: "Windows 8 Pro",
          },
    }
};
