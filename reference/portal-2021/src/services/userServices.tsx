import { REST_METHOD, REST_URL } from './../constants';

import request, { requestWithRetry } from './api';
import { AUTH } from 'constants/authConstants';

const UserService = {
  getUserDetailByEmail: (user_email: String) => {
    try {
      //const url = `${REST_URL.CMDB}${REST_URL.USERINFO}?user_email=${user_email}`;
      //return request(url, `${REST_METHOD.GET}`);

      const requestParams = {
        url: `${REST_URL.CMDB}${REST_URL.USERINFO}`,
        method: `${REST_METHOD.GET}`,
        queryParams: { user_email: user_email },
      };
      return request(requestParams);
    } catch (error) {
      console.error('Error with getUserDetailByEmail>>', JSON.stringify(error));
      return null;
    }
  },
  getSettings: async () => {
    try {
      const requestParams = {
        url: `${REST_URL.GET_SETTINGS}`,
        method: `${REST_METHOD.GET}`,
      };
      return requestWithRetry(requestParams);
    } catch (error) {
      console.error('Error with getSettings>>', JSON.stringify(error));
      return null;
    }
  },

  saveCurrentUser(data: any) {
    localStorage.setItem(AUTH.CURRENT_USER, JSON.stringify(data));
  },

  getCurrentUser() {
    let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
    return !!currentUser ? JSON.parse(currentUser) : null;
  },

  // checkAllowAccess: async (user_email: String) => {
  //   try {
  //     const requestParams = {
  //       url: `${REST_URL.APPDB}${REST_URL.CHECK_PILOT_USER}`,
  //       method: `${REST_METHOD.GET}`,
  //       queryParams: { user_email: user_email },
  //     };
  //     const response = await request(requestParams);
  //     //TODO
  //     // response.data.allowed_access = false;

  //     return response;
  //   } catch (error) {
  //     console.error('Error with getSettings>>', JSON.stringify(error));
  //     return null;
  //   }
  // },
  getSecretKeyConfig: async () => {
    try {
      const requestParams = {
        url: `${REST_URL.APPDB}${REST_URL.GET_SECRET_KEY_CONFIG}`,
        method: `${REST_METHOD.GET}`,
      };
      return requestWithRetry(requestParams);
    } catch (error) {
      console.error('Error with getSettings>>', JSON.stringify(error));
      return null;
    }
  },
  checkUserPilotMode: async (userName: string) => {
    try {
      const requestParams = {
        url: `${REST_URL.CMDB}${REST_URL.CHECK_USER_PILOT_MODE}`,
        method: `${REST_METHOD.GET}`,
        queryParams: { user_name: userName },
      };
      const response = await request(requestParams);
      return response;
    } catch (error) {
      console.error('Error with checkUserPilotMode>>', JSON.stringify(error));
      return null;
    }
  },
  checkUserDxcGear: async (userEmail: string, userCountry: string) => {
    try {
      const requestParams = {
        url: `${REST_URL.DXC_GEAR}`,
        method: `${REST_METHOD.GET}`,
        queryParams: { user_email: userEmail, user_country: userCountry },
      };
      const response = await request(requestParams);
      return response;
    } catch (error) {
      console.error('Error with checkUserDxcGear>>', JSON.stringify(error));
      return null;
    }
  },

  getConfig: async (config_name: string) => {
    try {
      const requestParams = {
        url: `${REST_URL.APPDB}${REST_URL.GET_CONFIG}`,
        method: `${REST_METHOD.GET}`,
        queryParams: { config_name: config_name },
      };
      const response = await request(requestParams);
      return response;
    } catch (error) {
      console.error('Error with getConfig>>', JSON.stringify(error));
      return null;
    }
  },

  clearAllByUser: async (userName: string) => {
    try {
      const requestParams = {
        url: `${REST_URL.CACHE}${REST_URL.CLEAR_ALL_BY_USER}`,
        method: `${REST_METHOD.POST}`,
        queryParams: { user_name: userName },
      };
      const response = await request(requestParams);
      return response;
    } catch (error) {
      console.error('Error with clearAllByUser>>', JSON.stringify(error));
      return null;
    }
  },
};
export default UserService;
