import MyDevicesComponent from '../components/MyDevices/MyDevicesComponent';
import {REST_METHOD, REST_URL} from '../constants';
import request from './api';

import {dummyData} from "./dummyData/requestDeviceFormQuestions";

export async function searchDeviceFormService(type) {
    //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>searchDeviceFormService: "+ JSON.stringify(type));

    const requestParams = {
        url: `${REST_URL.APPDB}${REST_URL.DEVICE_FORM}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {experience: type}
    };

    //TODO dummy data
    // return dummyData;
    
    return await request(requestParams);
}