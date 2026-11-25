import {REST_METHOD, REST_URL} from '../constants';

import request from './api';

export function submitDeviceRequestForm(paramObj) {
    //console.log("the value is submitDeviceRequestForm: "+ JSON.stringify(paramObj));

    try {
        const requestParams = {
            url: `${REST_URL.REQUEST}${REST_URL.SUBMIT_DEVICE_REQUEST_FORM}`,
            method: `${REST_METHOD.POST}`,
            data: paramObj
        };
        
        return request(requestParams);
    } catch (error) {
        console.error("Error", JSON.stringify(error));
        return [];
    }
}