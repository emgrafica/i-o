import {MARKETPLACE_DEVICES} from '../../constants';

const loadMarketplaceDevicesActionById = (params) => {
    return ({
        type: MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_BY_UID_START,
        params
    })
};

const setMarketplaceDevicesDetailAction = (marketplaceDeviceDetailById) =>({
    type: MARKETPLACE_DEVICES.SET_MARKETPLACE_DEVICES_BY_UID_START,
    marketplaceDeviceDetailById
});


const setErrorAction  = error => ({
    type: MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_FAILED,
    error
});

export {
    loadMarketplaceDevicesActionById,     
    setMarketplaceDevicesDetailAction,
    setErrorAction};
