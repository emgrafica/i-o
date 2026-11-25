import { REST_METHOD, REST_URL } from './../constants';
import request from './api';

const ShippingServices = {
  getValidAddress: async (params: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.SHIPPING}${REST_URL.ADDRESS_VALIDATION}`,
        method: `${REST_METHOD.POST}`,
        data: { ...params },
      };
      const response = await request(requestParams);
      return response.data;
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },
};

export default ShippingServices;
