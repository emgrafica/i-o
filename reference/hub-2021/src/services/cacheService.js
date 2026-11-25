import { REST_METHOD, REST_URL, AUTH } from "../constants";

import request from "./api";


const cacheService = {
    cacheClearPolicy: () => {
        try{
            let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
            if(currentUser){
                currentUser = JSON.parse(currentUser);
            }

            if(currentUser && currentUser.user_name){
                const requestParams = {
                    url: `${REST_URL.CACHE}${REST_URL.CLEAR_POLICY}`,
                    method: `${REST_METHOD.POST}`,
                    data: { user_name: currentUser.user_name}
                };
                return request(requestParams);
            } else {
                throw new Error("the currency user does not exist!");
            }
        } catch(error){
            console.error("Error with Cache Clear Policy", JSON.stringify(error));
            return null;
        }
    }
}

export default cacheService;