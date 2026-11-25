import request from './api';
import {REST_URL, REST_METHOD} from '../constants';

export async function searchMyStuffByUserEmail(userId) {

    const requestParams = {
        url: `${REST_URL.CMDB}${REST_URL.GET_ASSET_HARDWARES}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {user_name: userId}
    }

    return request(requestParams);
}
