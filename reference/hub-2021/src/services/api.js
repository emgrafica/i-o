import axios from 'axios';
import { config as envConfig } from '../config';
// let appStore;


// export function setAppStore(store) {
//     if (!appStore)
//       appStore = store;
//   }

export default async function request(requestParams) {
  //console.log(">>>>>>>>>>>>>>>>>HANDLE_request_SERVICE<<<<<<<<<<<requestParams:"+ JSON.stringify(requestParams));
  const {url, method, queryParams, data, options, responseType, hideLoading} =  requestParams;

    let headerObj = {
      'ocp-apim-subscription-key': `${envConfig.OcpApimSubscriptionKey}`,
      'Content-Type': 'application/json',
    };
    let endpointUrl = envConfig.OcpApimUrl + url;

    if (options) {
      if (options['Content-Type'] != 'notset')
        headerObj = {...headerObj, ...options};
    }

    let config = {
      url: endpointUrl,
      method: method,
      headers: headerObj
    };

    if(queryParams){
      config.params = parseObjectToQueryParam(queryParams);
    }

    if (data){
      config.data = data;
    }

    if (responseType)
      config.responseType = responseType;

    //prevent the encode default of axios
    config.paramsSerializer= (params) => {
      let result = decodeURIComponent(params.toString());
      return result;
    }
    try {
      const result = await axios(endpointUrl, config);
      return checkStatus(result);
    } catch(err){
      console.error("Error", JSON.stringify(err));
      return [];
    } 
  }



export async function requestWithRetry(requestParams, retryTime = 3, sleeptime = 200) {
  //console.log(">>>>>>>>>>>>>>>>>HANDLE_request_SERVICE<<<<<<<<<<<requestParams:"+ JSON.stringify(requestParams));
  const { url, method, queryParams, data, options, responseType, hideLoading } = requestParams;

  let headerObj = {
    'ocp-apim-subscription-key': `${envConfig.OcpApimSubscriptionKey}`,
    'Content-Type': 'application/json',
  };
  let endpointUrl = envConfig.OcpApimUrl + url;

  if (options) {
    if (options['Content-Type'] != 'notset')
      headerObj = { ...headerObj, ...options };
  }

  let config = {
    url: endpointUrl,
    method: method,
    headers: headerObj
  };

  if (queryParams) {
    config.params = parseObjectToQueryParam(queryParams);
  }

  if (data) {
    config.data = data;
  }

  if (responseType)
    config.responseType = responseType;

  //prevent the encode default of axios
  config.paramsSerializer = (params) => {
    let result = decodeURIComponent(params.toString());
    return result;
  }
  const instance = axios.create(config);
  const sleepRequest = (milliseconds, originalRequest) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(instance(originalRequest)), milliseconds);
    });
  };
  try {
    // const result = await axios(endpointUrl, config);
    // return checkStatus(result);
    let i = 0;
    instance.interceptors.response.use(response => {
      return response;
    }, error => {
      const { config } = error;
      const originalRequest = config;
      i++;
      if (i <= retryTime) {
        return sleepRequest(sleeptime, originalRequest);
      } else {
        return Promise.reject(error);
      }
    });
    const result = await instance(endpointUrl, config);
    return checkStatus(result);

  } catch (err) {
    console.error("Error", JSON.stringify(err));
    return [];
  }

}


export function parseObjectToQueryParam(obj) {
    let queryParams  = new URLSearchParams();
    if (obj) {
      for (let attr in obj) {
        queryParams.append(attr, obj[attr]);
      }
    }
    return queryParams;
}

function checkStatus(response) {
  // console.log('response'+ JSON.stringify(response));
  //appStore.dispatch(setLoadingState(false));
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function truncateString(str, num) {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

