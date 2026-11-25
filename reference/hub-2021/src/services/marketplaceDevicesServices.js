import {REST_METHOD, REST_URL} from './../constants';
import request from './api';


export async function getAllDevicesMarketPlace() {
    try {
      const requestParams = {
        url: `${REST_URL.GET_MARKET_PLACES}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {}
      };
      const response = await request(requestParams);

          //TODO
    // // debugger;
    // response.data.map(item => {
    //   if(item.device_profile === "Enhanced Laptop" || item.device_profile ===  "Standard Laptop Option" || item.device_type === 'Desktop'){
    //         // item.pc_state= 'REFRESH_AVAILABLE'
    //         item.image = null;
    //   }
    //   })


      return response;
    } catch (error) {
      console.error("Error", JSON.stringify(error));
      return [];
    }
  }

  export async function getDeviceMarketPlaceDetail(id) {
    try {
      const requestParams = {
        url: `${REST_URL.GET_MARKET_PLACE_DETAIL}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {id}
      };
      const response = await request(requestParams);

     //TODO
     //debugger;
    //  response.data.image = null;



      return response;
    } catch (error) {
      console.error("Error", JSON.stringify(error));
      return [];
    }
  }