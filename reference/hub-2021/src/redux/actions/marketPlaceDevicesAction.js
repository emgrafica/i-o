import {MARKETPLACE_DEVICES} from '../../constants';


const loadMarketplaceAllDevicesAction = () => {
    //console.log(">>>>>>>>>>>>>>>>>>setMarketplaceDevicesAction: params: " + params);
    return ({
        type: MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_START
    })
};

const setMarketplaceDevicesAction = (marketplaceDevices) =>({
    type: MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_SUCCEEDED,
    marketplaceDevices
});

const setErrorAction  = error => ({
    type: MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_FAILED,
    error
});

export {loadMarketplaceAllDevicesAction, 
        setMarketplaceDevicesAction, 
        setErrorAction};
