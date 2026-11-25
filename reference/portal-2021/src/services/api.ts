import axios, { AxiosRequestConfig } from 'axios';
import { env, OcpApi } from 'utils/env';

export default async function request(requestParams: any) {
  //console.log(">>>>>>>>>>>>>>>>>HANDLE_request_SERVICE<<<<<<<<<<<requestParams:"+ JSON.stringify(requestParams));
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
  let endpointUrl = env(OcpApi.OcpApimUrl) + url;

  if (options) {
    if (options['Content-Type'] != 'notset')
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
    return checkStatus(result);
  } catch (err) {
    console.error('Error', JSON.stringify(err));
    return [];
  }
}

export async function requestWithRetry(
  requestParams: any,
  retryTime: number = 3,
  sleeptime: number = 200,
) {
  //console.log(">>>>>>>>>>>>>>>>>HANDLE_request_SERVICE<<<<<<<<<<<requestParams:"+ JSON.stringify(requestParams));
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
  let endpointUrl = env(OcpApi.OcpApimUrl) + url;

  if (options) {
    if (options['Content-Type'] != 'notset')
      headerObj = { ...headerObj, ...options };
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
  config.paramsSerializer = params => {
    let result = decodeURIComponent(params.toString());
    return result;
  };
  const instance = axios.create(config);

  const sleepRequest = (milliseconds: any, originalRequest: any) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(instance(originalRequest)), milliseconds);
    });
  };
  try {
    // const result = await axios(endpointUrl, config);
    // return checkStatus(result);
    let i = 0;
    instance.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        const { config } = error;
        const originalRequest = config;
        i++;
        if (i <= retryTime) {
          return sleepRequest(sleeptime, originalRequest);
        } else {
          return Promise.reject(error);
        }
      },
    );
    const result = await instance(endpointUrl, config);
    return checkStatus(result);
  } catch (err) {
    console.error('Error', JSON.stringify(err));
    return [];
  }
}

export function parseObjectToQueryParam(obj: any) {
  let queryParams = new URLSearchParams();
  if (obj) {
    for (let attr in obj) {
      queryParams.append(attr, obj[attr]);
    }
  }
  return queryParams;
}

export function checkStatus(response: any) {
  // console.log('response'+ JSON.stringify(response));
  //appStore.dispatch(setLoadingState(false));
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.stack = response;
  throw error;
}

export function truncateString(str: String, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}
