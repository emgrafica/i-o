import noImageDesktop from 'assets/images/empty/emptyDesktop01-removebg-preview.png';
import noImageLaptop from 'assets/images/empty/emptyLaptop01-removebg-preview.png';
import { AUTH, REST_METHOD, REST_URL } from './../constants';
import request, { truncateString } from './api';
import DateUtils from 'utils/date';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const listState = {
  NORMAL_STATE: 'NORMAL_STATE',
  REFRESH_ELIGIBLE_STATE: 'REFRESH_ELIGIBLE_STATE',
  RETURN_STATE: 'RETURN_STATE',
};

const CONSTANTS = {
  IN_USE: 'In use',
  ELIGIBLE_FOR_REFRESH: 'ELIGIBLE_FOR_REFRESH',
  NOT_APPLICABLE: 'N/A',
};

let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
let infoUser = !!currentUser ? JSON.parse(currentUser) : {};

const convertDateToStringDateMonthAndYear = (sinceParm: any) => {
  let since = new Date(sinceParm);
  return monthNames[since.getMonth()] + ' ' + since.getFullYear();
};

const getLastActiveDate = (sinceParm: any) => {
  let since: any = new Date(sinceParm);
  const diffTime = Math.abs(Date.now() - since);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const DeviceServices = {
  getPCResfreshStatus: async (user_name: string) => {
    try {
      const requestParams = {
        url: `${REST_URL.CMDB}${REST_URL.MY_ASSETS}`,
        method: `${REST_METHOD.GET}`,
        queryParams: { user_name: user_name },
      };
      let response = await request(requestParams);

      if (!response.data) {
        return;
      }

      response = response.data;

      response = response.map((item: any) => {
        item.model.length > 23 ? item.model.slice(0, 20) + '...' : item.model;
        if (!item.model_picture) {
          item.model_picture = noImageLaptop;
        }

        // set config
        item.configuration = {};
        item.configuration.since = item.assigned_date
          ? convertDateToStringDateMonthAndYear(item.assigned_date)
          : CONSTANTS.NOT_APPLICABLE;
        item.configuration.osLicence = item.os
          ? item.os
          : CONSTANTS.NOT_APPLICABLE;
        item.configuration.lastActive = item.last_active
          ?  DateUtils.timetoXbyGMT(item.last_active)
          : CONSTANTS.NOT_APPLICABLE;
        item.model = truncateString(!!item.model ? item.model : '', 22);

        return item;
      });

      return response;

    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },

  getAssetStatusById: async (params: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.CMDB}${REST_URL.GET_ASSET_BY_ID}`,
        method: `${REST_METHOD.GET}`,
        queryParams: { ...params },
      };
      const response = await request(requestParams);
      const result = response.data.map((item: any) => {
        item.configuration = {};
        item.configuration.osLicence = item.os
          ? item.os
          : CONSTANTS.NOT_APPLICABLE;

        item.last_active = !item.last_active
          ? CONSTANTS.NOT_APPLICABLE
          : DateUtils.timetoXbyGMT(item.last_active);
        item.configuration.since = item.assigned_date
          ? convertDateToStringDateMonthAndYear(item.assigned_date)
          : CONSTANTS.NOT_APPLICABLE;
        return item;
      });
      return result;
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },

  getEligibleRefreshAssets: async (params: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.CMDB}${REST_URL.ELIGIBLE_REFRESH_ASSETS}`,
        method: `${REST_METHOD.GET}`,
        queryParams: { ...params },
      };
      const response = await request(requestParams);
      return response.data;
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },

  getDeviceBySerialNumber: async (params: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.ASSET}${REST_URL.GET_BY_SERIAL_NUMBER}`,
        method: `${REST_METHOD.GET}`,
        queryParams: { ...params },
      };

      const response = await request(requestParams);

      if (response && response.data && Array.isArray(response.data)) {
        return response.data[0];
      }

      return response.data;
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },
};

export default DeviceServices;
