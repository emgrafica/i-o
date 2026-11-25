import { REST_METHOD, REST_URL, AUTH } from '../constants';
import request from './api';

export async function searchAllKnowledge(param: any) {
  const {
    keyword,
    page_size,
    page_index,
    user_name,
    knowledge_bases,
    categories,
    order_by,
  } = param;
  let requestParams;
  if (param.keyword) {
    requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.SEARCH}`,
      method: `${REST_METHOD.GET}`,
      queryParams: {
        keyword: keyword,
        page_size: page_size,
        page_index: page_index,
        user_name: user_name,
        order_by: order_by,
        knowledge_bases: knowledge_bases,
        categories: categories,
      },
    };
  } else {
    requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.GET_ALL_FEATURE}`,
      method: `${REST_METHOD.GET}`,
      queryParams: {
        page_size: page_size,
        page_index: page_index,
        user_name: user_name,
      },
    };
  }

  return request(requestParams);
}

export async function getArticleByURLType(url: string, param: any) {
  let requestParams;

  requestParams = {
    url: `${REST_URL.KNOWLEDGE}${url}`,
    method: `${REST_METHOD.GET}`,
    queryParams: param,
  };
  const response = await request(requestParams);
  return response.data;
}

export async function getFilterKnowledgeBaseAndCategory(param: any) {
  const { keyword, user_name, knowledge_bases, categories } = param;
  let requestParams;
  if (param.keyword) {
    requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.FILTER_CATEGORY}`,
      method: `${REST_METHOD.GET}`,
      queryParams: {
        keyword: keyword,
        user_name: user_name,
        knowledge_bases: knowledge_bases,
        categories: categories,
      },
    };
  }

  return request(requestParams);
}

export async function getDetailByKBNumber(number: Number, userName: String) {
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
    console.error('Error', JSON.stringify(error));
    return null;
  }
}

export async function getAttachmentBySysId(uid: String) {
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
    console.error('Error', JSON.stringify(error));
    return [];
  }
}

export async function downloatAttachmentBySysId(uid: String) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.DOWNLOAD_ATTACHMENT}/${uid}`,
      method: `${REST_METHOD.GET}`,
      queryParams: {
        response_type: 'arraybuffer',
        //response_type: 'blob'
      },
    };

    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}
export async function provideFeedBack(paramObj: any) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.FEEDBACK}`,
      method: `${REST_METHOD.POST}`,
      data: paramObj,
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}
export async function getUserRatings(paramObj: any) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.KB_RATINGS}`,
      method: `${REST_METHOD.GET}`,
      queryParams: paramObj,
      options: {
        noCache: true,
      },
    };
    const response = await request(requestParams);
    const result = response.data || [];
    return result;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}
export async function getUserUsefuls(paramObj: any) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.KB_USEFULS}`,
      method: `${REST_METHOD.GET}`,
      queryParams: paramObj,
      options: {
        noCache: true,
      },
    };
    const response = await request(requestParams);
    const result = response.data || [];
    return result;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}
export async function getUserComments(paramObj: any) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.KB_COMMENTS}`,
      method: `${REST_METHOD.GET}`,
      queryParams: paramObj,
      options: {
        noCache: true,
      },
    };
    const response = await request(requestParams);
    const result = response.data || [];
    return result;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}

export async function getLatestComment(paramObj: any) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.LAST_COMMENT}`,
      method: `${REST_METHOD.GET}`,
      queryParams: paramObj,
      options: {
        noCache: true,
      },
    };
    const response = await request(requestParams);
    const result = response.data || {};
    return result;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return {};
  }
}

export async function getUsefulPercentage(paramObj: any) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.RETRIEVE_USEFUL}`,
      method: `${REST_METHOD.GET}`,
      queryParams: paramObj,
      options: {
        noCache: true,
      },
    };
    const response = await request(requestParams);
    return response.data || {};
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}

export async function updateViewCount(userName: String, kb_id: String) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}/${REST_URL.VIEW_COUNT}`,
      method: `${REST_METHOD.POST}`,
      data: { kb_uid: kb_id, user_name: userName },
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}

export async function mostViewedArticles(paramObj: any) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.RETRIEVE_TOP_VIEW_BY_CATE}`,
      method: `${REST_METHOD.GET}`,
      queryParams: paramObj,
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}

export const getTopThreeKnowledgeNews = async (params: any) => {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.NEWS}`,
      method: `${REST_METHOD.GET}`,
      queryParams: params,
    };
    let response = await request(requestParams);

    response =
      response && response.data
        ? response.data.data
          ? response.data.data
          : response.data
        : response;

    if (response.length > 3) {
      return response.slice(0, 3);
    }

    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
};

export async function updateLikeComment(userName: string, commentId: string) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.LIKE_COMMENT}`,
      method: `${REST_METHOD.POST}`,
      data: {
        user_name: userName,
        comment_uid: commentId,
      },
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}

export async function updateUnlikeComment(commentId: string) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.UNLIKE_COMMENT}`,
      method: `${REST_METHOD.POST}`,
      queryParams: {
        uid: commentId,
      },
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}

export async function deleteComment(commentId: string) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.DELETE_COMMENT}`,
      method: `${REST_METHOD.DELETE}`,
      queryParams: {
        uid: commentId,
      },
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}

export async function editComment(uid: String, comments: any) {
  try {
    const requestParams = {
      url: `${REST_URL.KNOWLEDGE}${REST_URL.KB_COMMENT}/${uid}`,
      method: `${REST_METHOD.PUT}`,
      data: comments,
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}
