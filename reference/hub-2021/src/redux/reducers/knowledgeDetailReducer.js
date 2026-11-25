import {KnowledgeDetailTypes} from '../actions/knowledgeDetailAction';
import {
  FEEDBACK_TYPE
} from "../../common/constant";
const defaultState = {
  kbDetail: {},
  mostViewedArt: [],
  isLoading: false,
  error: null,
  isEmpty:false,
  isCommentLoading:false,
  isHashTagLoading:false,
  isRatingLoading: false,
  kbNumber:'',
  comments:[],
  commentTotalCount:0,
  commentCount:0,
  latestRatingOnly: '',
  latestUsefulComment: {},
  latestUsefulOnly: {},
  currentCommentPageIndex: 0,
}

const loadingStatehandler = (type, isLoading)=>{
  let result = {};
  if(type === FEEDBACK_TYPE.COMMENT && !isLoading){
    result = {
      currentCommentPageIndex: defaultState.currentCommentPageIndex
    };
  }
  switch(type){
    case FEEDBACK_TYPE.RATING:
      return {
        isRatingLoading: isLoading,
      };
    case FEEDBACK_TYPE.COMMENT:
      return {
        isCommentLoading: isLoading,
        ...result
      }
    case FEEDBACK_TYPE.HASH_TAG:
      return {
        isHashTagLoading: isLoading,
      }
  }
}

export default (state = defaultState, action) => {
  const {type, KBDetail, isEmpty, comments, totalCount, feedbackType, mostViewedArt} =  action;
  switch (type) {
    case KnowledgeDetailTypes.FETCH_KNOWLEDGE_DETAIL_BY_KB_NUMBER:
      return {
        ...state,
        isLoading: true,
        // currentCommentPageIndex: 1,
        // kbNumber:'',
        error: null,
        isEmpty: false
      }
    case KnowledgeDetailTypes.FETCH_KNOWLEDGE_DETAIL_BY_KB_NUMBER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        kbDetail: KBDetail,
        mostViewedArt: mostViewedArt ? mostViewedArt: [],
        kbNumber:KBDetail.kbNumber,
        error: null,
        isEmpty,
      }
    case KnowledgeDetailTypes.KNOWLEDGE_DETAIL_PROVIDE_FEEDBACK:
      return {
        ...state,
        error: null,
        ...loadingStatehandler(action.feedbackType, true)
      }
    case KnowledgeDetailTypes.KNOWLEDGE_DETAIL_PROVIDE_FEEDBACK_SUCCESS:
      return {
        ...state,
        kbDetail: !!KBDetail ? KBDetail : state.kbDetail,
        comments: comments.length ? comments : state.comments,
        commentTotalCount: !!totalCount ? totalCount : state.commentTotalCount, 
        ...loadingStatehandler(feedbackType, false),
        error: null,
        currentCommentPageIndex: 1,
        commentCount: comments.length < 5 ? comments.length : 5,

      }

    case KnowledgeDetailTypes.FETCH_KNOWLEDGE_DETAIL_USER_FEEDBACK:
      return {
        ...state,
        isCommentLoading: true,
        error: null,
      }
    case KnowledgeDetailTypes.FETCH_KNOWLEDGE_DETAIL_USER_FEEDBACK_SUCCESS:
      return {
        ...state,
        comments,
        commentTotalCount:totalCount,
        isCommentLoading: false,
        error: null,
        commentCount:comments.length,
        currentCommentPageIndex: action.currentCommentPageIndex,
      }
    case KnowledgeDetailTypes.FETCH_LATEST_FEEDBACKS_BY_KB_NUMBER:
      return {
        ...state,
        error: null,
        isRatingLoading: true
      }
    case KnowledgeDetailTypes.FETCH_LATEST_FEEDBACKS_BY_KB_NUMBER_SUCCESS:
      return {
        ...state,
        latestRatingOnly: action.result.rating,
        latestUsefulComment: action.result.unUseful,
        latestUsefulOnly: action.result.useful,
        isRatingLoading: false,
        error: null,
      }  
    case KnowledgeDetailTypes.SET_CURRENT_COMMENT_PAGE_INDEX:
      return {
        ...state,
        currentCommentPageIndex: action.pageNumber,
      }
    case KnowledgeDetailTypes.SET_KNOWLEDGE_ERROR_ACTION:
      return {
        ...state,
        isLoading: false,
        isCommentLoading: false,
        isHashTagLoading: false,
        isRatingLoading: false,
        error: true
      }
    case KnowledgeDetailTypes.SET_COMMENT_LOADING:
      return {
        ...state,
        isCommentLoading: action.loading,
      }
  }

  return state;
}