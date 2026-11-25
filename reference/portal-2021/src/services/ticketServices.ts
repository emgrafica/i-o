import DateUtils from 'utils/date';
import { REST_METHOD, REST_URL } from '../constants';
import request from './api';
import UserService from './userServices';

let dataUser: any = UserService.getCurrentUser();

export async function incidentResolved(params: any) {
  const { incidentId, comment } = params;
  try {
    const requestParams = {
      url: `${REST_URL.INCIDENT}${REST_URL.RESOLVED}`,
      method: `${REST_METHOD.POST}`,
      queryParams: { incident_id: incidentId, user_name: dataUser.user_name },
      data: { comments: comment },
    };
    const response = await request(requestParams);
    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return [];
  }
}

export async function getListFilterINC(userName: String) {
  try {
    const requestParams = {
      url: `${REST_URL.INCIDENT}${REST_URL.GET_FILTERS}`,
      method: `${REST_METHOD.GET}`,
      queryParams: { user_name: userName },
    };
    const response = await request(requestParams);

    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return null;
  }
}

export async function getListFilterRITM(userName: String) {
  try {
    const requestParams = {
      url: `${REST_URL.ORDER}${REST_URL.GET_FILTERS}`,
      method: `${REST_METHOD.GET}`,
      queryParams: { user_name: userName },
    };
    const response = await request(requestParams);

    return response;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return null;
  }
}

export async function getRequestTicket(param: any) {
  const {
    refine,
    states,
    request_for,
    sort_order,
    date_range,
    categories,
    page_size,
    page_index,
    user_name,
  } = param;
  let requestParams;
  requestParams = {
    url: `${REST_URL.ORDER}${REST_URL.SEARCH}`,
    method: `${REST_METHOD.GET}`,
    queryParams: {
      refine,
      states,
      request_for,
      sort_order,
      date_range,
      categories,
      page_size,
      page_index,
      user_name,
    },
  };
  return request(requestParams);
}

export async function getIncidentTicket(param: any) {
  const {
    refine,
    states,
    sort_order,
    date_range,
    page_size,
    page_index,
    user_name,
  } = param;
  let requestParams;
  requestParams = {
    url: `${REST_URL.INCIDENT}${REST_URL.SEARCH}`,
    method: `${REST_METHOD.GET}`,
    queryParams: {
      refine,
      states,
      sort_order,
      date_range,
      page_size,
      page_index,
      user_name,
    },
  };
  return request(requestParams);
}

export async function getActivities(isTicket: string, uid: string) {
  try {
    let url =
      isTicket === 'INC'
        ? `${REST_URL.INCIDENT}${REST_URL.ACTIVITIES}`
        : `${REST_URL.REQUEST}${REST_URL.ACTIVITIES}`;
    const requestParams = {
      url: url,
      method: `${REST_METHOD.GET}`,
      queryParams: { uid: uid },
    };

    let result = await request(requestParams);

    if (!result) {
      return;
    }

    result = result.data;

    if (result.activities.length > 0) {
      result.activities = result.activities.map((item: any) => {
        item.createdDate = DateUtils.timetoXbyGMT(item.createdDate);

        return item;
      });
    }

    return result;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return null;
  }
}

export async function getTicketDetail(
  isTicket: string,
  ticketNumber: string,
  userName: string,
) {
  try {
    let requestParams = {};
    isTicket === 'INC'
      ? (requestParams = {
        url: `${REST_URL.INCIDENT}${REST_URL.GET_INCIDENT_NUMBER}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {
          incident_number: ticketNumber,
          user_name: userName,
        },
      })
      : (requestParams = {
        url: `${REST_URL.ORDER}${REST_URL.GET_INCIDENT_NUMBER}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {
          order_number: ticketNumber,
          user_name: userName,
        },
      });

    let result = await request(requestParams);

    return result;
  } catch (error) {
    console.error('Error', JSON.stringify(error));
    return null;
  }
}

const TicketServices = {
  getIncident: async (param: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.INCIDENT}${REST_URL.SEARCH}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {
          user_name: param,
          states: 'Open',
          page_index: 1,
          page_size: 1,
        },
      };
      const response = await request(requestParams);
      return response.data || {};
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },
  getOrder: async (param: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.ORDER}${REST_URL.SEARCH}`,
        method: `${REST_METHOD.GET}`,
        queryParams: {
          user_name: param,
          states: 'Open',
          page_index: 1,
          page_size: 1,
        },
      };
      const response = await request(requestParams);
      return response.data || {};
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },
  getAttachmentsTicket: async (param: any, isIncident: boolean) => {
    try {
      let requestParams = {}
      if(isIncident){
        requestParams = {
          url: `${REST_URL.INCIDENT}${REST_URL.GET_ATTACHMENTS}`,
          method: `${REST_METHOD.GET}`,
          queryParams: {
            incident_id: param,
          },
        };
      }else{
        requestParams = {
          url: `${REST_URL.ORDER}${REST_URL.GET_ATTACHMENTS}`,
          method: `${REST_METHOD.GET}`,
          queryParams: {
            uid: param,
          },
        };
      }
      const response = await request(requestParams);
      return response.data || {};
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },
  postAttachmentsIncident: async (params: any, formData: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.INCIDENT}${REST_URL.POST_ATTACHMENT}`,
        method: `${REST_METHOD.POST}`,
        queryParams: {
          incident_id: params.id,
          file_name: params.name,
          type: params.type,
        },
        options: {
          'Content-Type': 'application/octet-stream',
        },
        data: formData,
      };
      const response = await request(requestParams);
      return response || {};
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },

  postAttachmentsRequest: async (params: any, formData: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.ORDER}${REST_URL.POST_ATTACHMENT}`,
        method: `${REST_METHOD.POST}`,
        queryParams: {
          RITM_sys_id: params.id,
          file_name: params.name,
          type: params.type,
        },
        options: {
          'Content-Type': 'application/octet-stream',
        },
        data: formData,
      };
      const response = await request(requestParams);
      return response || {};
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },

  downloatAttachmentBySysId: async (params: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.INCIDENT}${REST_URL.DOWNLOAD_ATTACHMENT}/${params}`,
        method: `${REST_METHOD.GET}`,
      };

      const response = await request(requestParams);
      return response;
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },
  incidentReopen: async (param: any, comments: string) => {
    try {
      const requestParams = {
        url: `${REST_URL.INCIDENT}${REST_URL.POST_INCIDENT_REOPEN}`,
        method: `${REST_METHOD.POST}`,
        queryParams: {
          incident_id: param,
          user_name: dataUser.user_name,
        },
        data: { comments: comments },
        options: {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        },
      };
      const response = await request(requestParams);
      return response.data || {};
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },

  getAttachmentsExtension: async (param: any) => {
    try {
      const requestParams = {
        url: `${REST_URL.APPDB}${REST_URL.GET_ATTACHMENT_EXTENSION}`,
        method: `${REST_METHOD.GET}`,
      };
      const response = await request(requestParams);
      return response.data || {};
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },

  provideComment: async (
    isTicket: string,
    id: string,
    userName: string,
    comments: string,
  ) => {
    try {
      let requestParams = {};
      isTicket === 'INC'
        ? (requestParams = {
          url: `${REST_URL.INCIDENT}${REST_URL.ADD_COMMENT}`,
          method: `${REST_METHOD.POST}`,
          queryParams: {
            incident_id: id,
            user_name: userName,
          },
          data: {
            comments: comments,
          },
        })
        : (requestParams = {
          url: `${REST_URL.ORDER}${REST_URL.ADD_COMMENT}`,
          method: `${REST_METHOD.POST}`,
          queryParams: {
            uid: id,
            user_name: userName,
          },
          data: {
            comments: comments,
          },
        });
      const response = await request(requestParams);
      return response;
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },
  deleteAttachment: async (attachmentId: any, isIncident: boolean) => {
    try {
      const requestParams = {
        url: `${isIncident ? REST_URL.INCIDENT : REST_URL.ORDER}${REST_URL.DELETE_ATTACHMENT}`,
        method: `${REST_METHOD.DELETE}`,
        queryParams: {
          attachment_id: attachmentId,
        },
      };
      const response = await request(requestParams);
      return response;
    } catch (error) {
      console.error('Error', JSON.stringify(error));
      return [];
    }
  },
};

export default TicketServices;
