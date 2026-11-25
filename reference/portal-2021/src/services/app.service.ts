import request from './api';
import { REST_METHOD, REST_URL } from './../constants';
import { TenantConfig } from 'models/globalTypes';

const AppService = {
  getTenantConfig: async () => {
    try {
      const requestParams = {
        url: `${REST_URL.APPDB}${REST_URL.GET_TENANT_CONFIG}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {},
      };
      let result = await request(requestParams);
      return result ? result.data as TenantConfig : null;
    } catch {
      return null;
    }
  },
};

export default AppService;
