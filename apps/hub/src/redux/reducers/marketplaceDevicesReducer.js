import {MARKETPLACE_DEVICES, MY_DEVICES} from '../../constants'
import noImageLaptop from '../../assets/images/empty/emptyLaptop01-removebg-preview.png';
import noImageDesktop from '../../assets/images/empty/emptyDesktop01-removebg-preview.png';

const defaultState = {
    isLoading: true,
    error: null,
    data: [],
    action: "",
    params: [],
    totalCount: 0
  };

export default (state = defaultState, action) => {
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>marketplaceDevicesReducer:state: " + state);
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>marketplaceDevicesReducer:action: " + JSON.stringify(action));
    const {type, marketplaceDevices, error, params} = action;
    const data = marketplaceDevices ? marketplaceDevices.hasOwnProperty('data') ?  marketplaceDevices.data : marketplaceDevices : [];
    //debugger;
    switch (type) {
        case MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_START:
          return {
            ...state,
            isLoading: true,
            error: null,
            data: [],
            params: params,
            action: type
          }
        case MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_SUCCEEDED: {
          if(data){
            let myDevicesRefreshed = localStorage.getItem(MY_DEVICES.AVAILABLE_DEVICES_FOR_REFRESH);

            myDevicesRefreshed = myDevicesRefreshed? JSON.parse(myDevicesRefreshed): [];
        
            myDevicesRefreshed.forEach(deviceRefresh=> {
              let countDeviceRefresh = 0;
              //check the market device is refresh
              data.map(device => {
                if(device!="" && device.device_profile == deviceRefresh.device_profile){
                  countDeviceRefresh ++;
                  device.available_refresh = true;
                }
              });

              //if refreshed device does not exit in market device. 
              if(countDeviceRefresh == 0) {
                data.map(device => {
                  if(device!="" && device.default && device.default === true){
                    device.available_refresh = true;
                  }
                });
              }

              //verify the image is empty
              data.map((item) => {

                const {image} = item;
                if (!image) {
                  item.image = noImageLaptop ;
                  if (item.device_type === 'Desktop') {
                    item.image = noImageDesktop;
                  }
                }
              });

            })

          }
          return {
            ...state,
            isLoading: false,
            data: data
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
