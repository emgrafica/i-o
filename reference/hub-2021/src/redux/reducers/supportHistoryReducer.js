import { SupportHistoryTypes } from '../actions/supportHistoryAction';
const defaultState = {
  isLoading: true,
  isLoadingArticle: true,
  isLoadingWhatsNews: true,
  error: null,
  supportHistory: [],
  queryParams: "",
  dataArticle:[],
  whatsNews:[]
};

export default (state = defaultState, action) => {
  const { supportHistory, queryParams, error, dataArticle, whatsNews } = action;

  switch (action.type) {
    case SupportHistoryTypes.LOAD_SUPPORT_HISTORY_ACTION:
      return {
        ...state,
        isLoading: true,
        error: null,
        supportHistory: [],
        queryParams: queryParams
      };
    case SupportHistoryTypes.SET_SUPPORT_HISTORY_ACTION:
      return {
        ...state,
        isLoading: false,
        supportHistory: supportHistory.data,
        totalCount: supportHistory.totalCount
      };

    case SupportHistoryTypes.FETCH_TOP_KNOWLEDGE_ARTICLE_ITEM:
      return {
        ...state,
        isLoadingArticle: true,
      };
    case SupportHistoryTypes.FETCH_TOP_KNOWLEDGE_ARTICLE_ITEM_SUCCESS:
      return {
        ...state,
        isLoadingArticle: false,
        dataArticle
      };
    case SupportHistoryTypes.FETCH_WHATSNEWS_ITEM:
      return {
        ...state,
        isLoadingWhatsNews: true,
        whatsNews:[]
      };
    case SupportHistoryTypes.FETCH_WHATSNEWS_ITEM_SUCCESS:
      return {
        ...state,
        isLoadingWhatsNews: false,
        whatsNews
      };
    case SupportHistoryTypes.SET_ERROR_ACTION:
      return {
        ...state,
        isLoading: false,
        error: error
      };
  }
  return state;
};
