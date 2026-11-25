import request, {parseObjectToQueryParam} from './api';
import {REST_URL, REST_METHOD} from './../constants';

export async function getLinkLibrary(location) {
    // const requestParams = {
    //     url: `${REST_URL.LINK_LIBRARY}${REST_URL.LINK_LIBRARY}`,
    //     method: `${REST_METHOD.GET}`
    // };
    const requestParams = {
        url: `${REST_URL.LINK_LIBRARY}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {link_location: location}
    };

    const response = await request(requestParams);
    // response = {
    //     "data": [
    //         {
    //             "key": "manageAccount",
    //             "url": "https://google.com",
    //             "description": "Manage Account"
    //         },
    //         {
    //             "key": "intranet",
    //             "url": "https://google.com",
    //             "description": "Intranet"
    //         },
    //         {
    //             "key": "hrCenter",
    //             "url": "https://google.com",
    //             "description": "HR Center"
    //         }
    //     ]
    // }

    return response;
}