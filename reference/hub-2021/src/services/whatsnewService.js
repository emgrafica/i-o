import request, { parseObjectToQueryParam } from './api';
import { REST_URL, REST_METHOD } from './../constants';

export async function getWhatsnewItem(paramObj, maxItem = null) {
	// return request(`${REST_URL.KNOWLEDGE}${REST_URL.ANNOUNCEMENT}`, `${REST_METHOD.GET}`, paramObj);
	const userId = paramObj ? paramObj.user_name : null;
	const requestParams = {
		url: `${REST_URL.GET_WHATSNEW}`,
		method: `${REST_METHOD.GET}`,
		queryParams: {
			user_name: userId,
			text_limit: 200,
			limit_announcement: maxItem,
			limit_pc_refresh: 1,
			limit_ticket: maxItem,
			limit_featured_kb: 3
		}
	};
	const response = await request(requestParams);
	return response;
}

export async function getTopKnowledgeArticleItem() {
	// return request(`${REST_URL.KNOWLEDGE}${REST_URL.ANNOUNCEMENT}`, `${REST_METHOD.GET}`, paramObj);
	const requestParams = {
		url: `${REST_URL.KNOWLEDGE}${REST_URL.GET_ALL_FEATURE}`,
		method: `${REST_METHOD.GET}`,
		queryParams: { page_size: 3, page_index: 1 }
	};
	const response = await request(requestParams);
	return response;
}

// requestParams = {
// 	url: `${REST_URL.KNOWLEDGE}${REST_URL.GET_ALL_FEATURE}`,
// 	method: `${REST_METHOD.GET}`,
// 	queryParams: {page_size: page_size, page_index: page_index}
// };
