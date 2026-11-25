import { REST_METHOD, REST_URL } from "./../constants";

import request, {requestWithRetry} from "./api";

const UserService = {
  getUserDetailByEmail: (user_email) => {
    try {
      //const url = `${REST_URL.CMDB}${REST_URL.USERINFO}?user_email=${user_email}`;
      //return request(url, `${REST_METHOD.GET}`);

      const requestParams = {
        url: `${REST_URL.CMDB}${REST_URL.USERINFO}`,
        method: `${REST_METHOD.GET}`,
        queryParams: { user_email: user_email }
      };

      return request(requestParams);
    } catch (error) {
      console.error("Error with getUserDetailByEmail>>", JSON.stringify(error));
      return null;
    }
  },
  getSettings: async () => {
    try {
      const requestParams = {
        url: `${REST_URL.GET_SETTINGS}`,
        method: `${REST_METHOD.GET}`
      };
      return requestWithRetry(requestParams);
    } catch (error) {
      console.error("Error with getSettings>>", JSON.stringify(error));
      return null;
    }
  },

  checkAllowAccess: async (user_email) => {
    try {
      const requestParams = {
        url: `${REST_URL.APPDB}${REST_URL.CHECK_PILOT_USER}`,
        method: `${REST_METHOD.GET}`,
        queryParams: { user_email: user_email }
      };
      const response =  await request(requestParams);
      //TODO
      // response.data.allowed_access = false;

      return response;
    } catch (error) {
      console.error("Error with getSettings>>", JSON.stringify(error));
      return null;
    }
  }
};
export default UserService;
