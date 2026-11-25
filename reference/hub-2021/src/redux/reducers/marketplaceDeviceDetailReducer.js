import {MARKETPLACE_DEVICES, MY_DEVICES} from '../../constants'
import noImageLaptop from '../../assets/images/empty/emptyLaptop01-removebg-preview.png';
import noImageDesktop from '../../assets/images/empty/emptyDesktop01-removebg-preview.png';

const defaultState = {
    isLoading: true,
    error: null,
    data: [],
    action: "",
    params: [],
    totalCount: 0,
  };

export default (state = defaultState, action) => {
  //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>marketplaceDeviceDetailReducer:state: " + state);
  //  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>marketplaceDeviceDetailReducer:action: " + JSON.stringify(action));
    const {type, error, params, marketplaceDeviceDetailById} = action;
    const data = marketplaceDeviceDetailById ? 
        marketplaceDeviceDetailById.hasOwnProperty('data') ?  marketplaceDeviceDetailById.data : marketplaceDeviceDetailById : [];

    
    switch (type) {
        case MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_BY_UID_START:
          return {
            ...state,
            isLoading: true,
            error: null,
            data: [],
            action: type,
            params: params
          }
        case MARKETPLACE_DEVICES.SET_MARKETPLACE_DEVICES_BY_UID_START: {

          if(data){
            //debugger;
            let listDevices = localStorage.getItem(MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES);
            listDevices = listDevices? JSON.parse(listDevices): [];

            listDevices.forEach(device => {
              if(device.id === data.id){
                data.available_refresh = device.available_refresh;
              } 
            });

            if(!data.image) {
              data.image = noImageLaptop;

              if (device_type === 'Desktop') {
                data.image = noImageDesktop;
              }
            }
          }

          return {
            ...state,
            data: data,
            isLoading: false,
          }
        }

        case MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_FAILED:
          return {
            ...state,
            isLoading: false,
            error: error,
            action: type
          }
      }
    return state;
}
