import { REST_METHOD, REST_URL } from "../constants";

import request from "./api";

export async function searchSupportHistoryByUser(queryParams) {
  const requestParams = {
    url: `${REST_URL.SUPPORTTICKET}${REST_URL.GET_ALL}`,
    method: `${REST_METHOD.GET}`,
    queryParams: queryParams
  };

  return request(requestParams);
}
export async function getTicketById(queryParams, isIncidentTicket = true) {
  try {
    const requestParams = {
      url: isIncidentTicket
        ? `${REST_URL.INCIDENT}${REST_URL.RETRIEVEBYNUMBER}`
        : `${REST_URL.REQUEST}${REST_URL.RETRIEVE_REQUEST_BYNUMBER}`,
      method: `${REST_METHOD.GET}`,
      queryParams: queryParams
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error("Error", JSON.stringify(error));
    return null;
  }
}

export async function provideTicketFeedBack(
  paramObj,
  comment,
  isIncidentTicket = true
) {
  try {
    const requestParams = {
      url: isIncidentTicket
        ? `${REST_URL.INCIDENT}${REST_URL.ADD_COMMENT}`
        : `${REST_URL.REQUEST}${REST_URL.REQUEST_ITEM}${REST_URL.ADD_COMMENT}`,
      method: `${REST_METHOD.POST}`,
      queryParams: paramObj,
      data: {
        comments: comment
      }
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error("Error", JSON.stringify(error));
    return [];
  }
}
export async function updateIncidentTicket(paramObj, action, comments) {
  try {
    const requestParams = {
      url: `${REST_URL.INCIDENT}/${action}`,
      method: `${REST_METHOD.POST}`,
      queryParams: paramObj,
      data: {
        comments: comments
      }
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error("Error", JSON.stringify(error));
    return [];
  }
}
