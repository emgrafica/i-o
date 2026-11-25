import axios, { AxiosRequestConfig } from 'axios';
import { env, Boomi, OcpApi } from 'utils/env';
import { checkStatus, parseObjectToQueryParam } from './api';
import { REST_METHOD, REST_URL, AUTH } from '../constants';
import request from './api';
import UserService from './userServices';

let dataUser: any = UserService.getCurrentUser();

export async function clearCacheOrder(paramObj: any) {
  try {
    const requestParams = {
      url: `${REST_URL.CACHE}${REST_URL.CLEAR_ORDER}`,
      method: `${REST_METHOD.POST}`,
      queryParams: paramObj,
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}

export default async function requestBoomi(requestParams: any) {
  const {
    url,
    method,
    queryParams,
    data,
    options,
    responseType,
  } = requestParams;

  let headerObj = {
    'ocp-apim-subscription-key': `${env(OcpApi.OcpApimSubscriptionKey)}`,
    'Content-Type': 'application/json',
  };
  let endpointUrl = env(Boomi.BoomiUrl) + url;

  if (options) {
    if (options['Content-Type'] !== 'notset')
      headerObj = { ...headerObj, ...options };
    if (options['noCache']) {
      const noCache = {
        pragma: 'no-cache',
        'cache-control': 'no-cache',
      };
      headerObj = { ...headerObj, ...noCache };
    }
  }

  let config: AxiosRequestConfig = {
    url: endpointUrl,
    method: method,
    headers: headerObj,
  };

  if (queryParams) {
    config.params = parseObjectToQueryParam(queryParams);
  }

  if (data) {
    config.data = data;
  }

  if (responseType) config.responseType = responseType;

  //prevent the encode default of axios
  config.paramsSerializer = (params: any) => {
    let result = decodeURIComponent(params.toString());
    return result;
  };

  try {
    //AxiosRequestConfig
    const result = await axios(endpointUrl, config);
    if (result) {
      await clearCacheOrder({
        user_name: dataUser.user_name,
      });
    }

    return checkStatus(result);
  } catch (err) {
    console.error('Error', JSON.stringify(err));
    return [];
  }
}
