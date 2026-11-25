import { REST_METHOD, REST_URL, AUTH } from "./../constants";
import request from "./api";

export async function searchAllKnowledge(param) {
  const { query, page_size, page_index, user_name } = param;
  let requestParams;
  if (param.query) {
    requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.SEARCH}`,
      method: `${REST_METHOD.GET}`,
      queryParams: {
        query: query,
        page_size: page_size,
        page_index: page_index,
        user_name: user_name
      },
    };
  } else {
    requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.GET_ALL_FEATURE}`,
      method: `${REST_METHOD.GET}`,
      queryParams: { page_size: page_size, page_index: page_index },
    };
  }

  return request(requestParams);
}

export async function getDetailByKBNumber(number, userName) {
  // const url = `${REST_URL.KNOWLEDGE}${REST_URL.RETRIEVE}?number=${number}`;
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.RETRIEVE}`,
      method: `${REST_METHOD.GET}`,
      queryParams: { number: number, user_name: userName },
    };
    const response = await request(requestParams);

    return response;
  } catch (error) {
    console.error("Error", JSON.stringify(error));
    return null;
  }
}

export async function getAttachmentBySysId(uid) {
  try {
    // const url = `${REST_URL.KNOWLEDGE}${REST_URL.ATTACHMENT}?kb_uid=${uid}`;

    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.ATTACHMENT}`,
      method: `${REST_METHOD.GET}`,
      queryParams: { kb_uid: uid },
    };

    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error("Error", JSON.stringify(error));
    return [];
  }
}

export async function downloatAttachmentBySysId(uid) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.DOWNLOAD_ATTACHMENT}/${uid}`,
      method: `${REST_METHOD.GET}`,
      queryParams: {
        response_type: "arraybuffer",
        //response_type: 'blob'
      },
    };

    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error("Error", JSON.stringify(error));
    return [];
  }
}
export async function provideFeedBack(paramObj) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.FEEDBACK}`,
      method: `${REST_METHOD.POST}`,
      data: paramObj,
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error("Error", JSON.stringify(error));
    return [];
  }
}
export async function getUserFeedBack(paramObj) {
  try {
    let currentUser = localStorage.getItem(AUTH.CURRENT_USER);
    if (currentUser) {
      paramObj.user_name = (JSON.parse(currentUser)).user_name;
    }
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.RETRIEVEFEEDBACK}`,
      method: `${REST_METHOD.GET}`,
      queryParams: paramObj,
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error("Error", JSON.stringify(error));
    return [];
  }
}

export async function updateViewCount(dataPost) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}/${REST_URL.VIEW_COUNT}`,
      method: `${REST_METHOD.POST}`,
      data: dataPost
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error("Error", JSON.stringify(error));
    return [];
  }
}

export async function mostViewedArticles(paramObj) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.RETRIEVE_TOP_VIEW_BY_CATE}`,
      method: `${REST_METHOD.GET}`,
      queryParams: paramObj,
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error("Error", JSON.stringify(error));
    return [];
  }
}
