import MyDevicesComponent from '../components/MyDevices/MyDevicesComponent';
import {REST_METHOD, REST_URL} from './../constants';
import request from './api';

import {dummyData} from './dummyData/MyDevicesDummyData.js';

export async function searchAllMyDevicesByUserId(user_name) {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>searchAllMyDevices: "+ JSON.stringify(user_name));

    const requestParams = {
        url: `${REST_URL.CMDB}${REST_URL.MY_DEVICES}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {user_name: user_name}
    };

    //return dummyData;
    const result = await request(requestParams);

    //TODO
    //  debugger;
    // const result = dummyData;
    // result.data.map(item => {
    //     // if(item.device_profile === "Standard Laptop Option" || item.device_profile ===  "Standard Laptop Option"){
    //           item.pc_state= 'REFRESH_AVAILABLE'
    //           item.image = null;
    //           item.device_profile = 'Old Laptop'
    //     // }
    //     })


    return  result;
  }

// export async function getAllDevicesMarketPlace() {
//     try {
//       const requestParams = {
//         url: `${REST_URL.GET_MARKET_PLACES}`,
//         method: `${REST_METHOD.GET}`,
//         queryParams: {}
//       };
//       const response = await request(requestParams);
//       return response;
//     } catch (error) {
//       console.error("Error", JSON.stringify(error));
//       return [];
//     }
//   }

//   export async function getDeviceMarketPlaceDetail(id) {
//     try {
//       const requestParams = {
//         url: `${REST_URL.GET_MARKET_PLACE_DETAIL}`,
//         method: `${REST_METHOD.GET}`,
//         queryParams: {id}
//       };
//       const response = await request(requestParams);
//       return response;
//     } catch (error) {
//       console.error("Error", JSON.stringify(error));
//       return [];
//     }
//   }