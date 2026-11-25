import moment from "moment";
import { call, put, takeLatest,select } from 'redux-saga/effects';
import {
  FEEDBACK_TYPE
} from "../../common/constant";
import { getDetailByKBNumber, mostViewedArticles, getUserFeedBack, provideFeedBack, updateViewCount } from '../../services/knowledgeServices';
import DateUtils from "../../utils/date";
import KnowledgeDetailAction, { KnowledgeDetailTypes } from '../actions/knowledgeDetailAction';

function getDays(lastUpdated) {
  let days = null;
  const current = moment(new Date());
  const dateUpdated = moment(lastUpdated);
  const duration = moment.duration(current.diff(dateUpdated));
  days = Math.ceil(duration.asDays());
  return DateUtils.getFormatedStringFromDays(days);
}

export function* fetchKnowledgeDetailByKBNumber(action) {
  const {kbNumber, userName} = action;
  try {
    const result = yield call(getDetailByKBNumber, kbNumber, userName);
    if (result.status === 200) {
      const data = result.data;
      if (!!data) {
        const response = yield call(mostViewedArticles, {
          page_size: 5,
          page_index: 1,
          user_name: userName,
          kb_category: data.kbCategory,
          kb_number: kbNumber,
          kb_base: data.kbBase
        });
        const mostViewedArt = response.status === 200 ? response.data.data : [];

        yield call(updateViewCount, {
          user_name: userName,
          kb_sys_id: data.uid
        });
        data.fromDays = getDays(data.lastUpdated);
        yield put(KnowledgeDetailAction.fetchKnowledgeDetailByKBNumberSuccess(data, mostViewedArt, false));
      } else {
        yield put(KnowledgeDetailAction.fetchKnowledgeDetailByKBNumberSuccess({kbNumber:kbNumber}, [], true));
      }

    } else {
      throw new Error(result.error)
    }

  } catch (error) {
    yield put(KnowledgeDetailAction.setKnowledgeErrorAction(error));
  }
}

export function* knowledgeDetailProvideFeedback(action) {
  try {
    const result = yield call(provideFeedBack, action.rateState);
    if (result) {
      let KBDetail = null,
        commentData = null;
      if (FEEDBACK_TYPE.RATING === action.feedbackType) {
        KBDetail = yield call(getDetailByKBNumber, action.kbNumber, action.userName);
        KBDetail.data.fromDays = getDays(KBDetail.data.lastUpdated);
      }else if (FEEDBACK_TYPE.COMMENT === action.feedbackType) {
        commentData = yield call(getUserFeedBack, action.pageState);
      }
      yield put(KnowledgeDetailAction.knowledgeDetailProvideFeedbackSuccess(
        !!KBDetail ? KBDetail.data : null,
        action.feedbackType,
        !!commentData ? commentData.data.data : [],
        !!commentData ? commentData.data.totalCount : null,
      ));
    } else {
      throw new Error(result.error)
    }

  } catch (error) {
    yield put(KnowledgeDetailAction.setKnowledgeErrorAction(error));
  }
}

export function* fetchKnowledgeDetailUserFeedBack(action) {
  try {
    const knowledgeDetail = yield select(state => {
      return state.knowledgeDetail;
    });

    const {params} = action;

    const loadMore = knowledgeDetail.kbNumber && knowledgeDetail.kbNumber === params.number? true: false;

    if(!params.page_index){
      params.page_index = 1;
    }

    if (loadMore && params.page_index === knowledgeDetail.currentCommentPageIndex 
        && knowledgeDetail.comments.length > 0){

      yield put(KnowledgeDetailAction.setCommentLoading(false));
      return;
    }

    const result = yield call(getUserFeedBack, params);
    if (result) {
      var listAllComments = loadMore ? knowledgeDetail.comments.concat(result.data.data) : result.data.data;

      yield put(KnowledgeDetailAction.fetchKnowledgeDetailUserFeedbackSuccess(listAllComments, result.data.totalCount, params.page_index));
    } else {
      throw new Error(result.error)
    }

  } catch (error) {
    yield put(KnowledgeDetailAction.setKnowledgeErrorAction(error));
  }
}

export function* fetchLatestFeedbacksByKBNumber(action) {
  try {
    const ratingOnlyResult = yield call(getUserFeedBack, {...action.params, type: 'rating_only'});
    const usefulCommentResult = yield call(getUserFeedBack, {...action.params, type: 'useful_comment'});
    const usefulOnlyResult = yield call(getUserFeedBack, {...action.params, type: 'useful_only'})
    const result = {};
    if (ratingOnlyResult.data.data.length > 0) {
      result.rating = ratingOnlyResult.data.data[0].rating;
    }
    if (usefulCommentResult.data.data.length > 0) {
      result.unUseful = {
        useful : usefulCommentResult.data.data[0].useful,
        lastUpdated: usefulCommentResult.data.data[0].lastUpdated,
      };
    }
    if (usefulOnlyResult.data.data.length > 0) {
      result.useful = {
        useful: usefulOnlyResult.data.data[0].useful,
        lastUpdated: usefulOnlyResult.data.data[0].lastUpdated,
      } 
    }
    if (result) {
      yield put(KnowledgeDetailAction.fetchLatestFeedbacksByKBNumberSuccess(result));
    } else {
      throw new Error(result.error)
    }

  } catch (error) {
    yield put(KnowledgeDetailAction.setKnowledgeErrorAction(error));
  }
}

export const watchKnowledgeDetail = [
  takeLatest(KnowledgeDetailTypes.FETCH_KNOWLEDGE_DETAIL_USER_FEEDBACK, fetchKnowledgeDetailUserFeedBack),
  takeLatest(KnowledgeDetailTypes.FETCH_KNOWLEDGE_DETAIL_BY_KB_NUMBER, fetchKnowledgeDetailByKBNumber),
  takeLatest(KnowledgeDetailTypes.KNOWLEDGE_DETAIL_PROVIDE_FEEDBACK, knowledgeDetailProvideFeedback),
  takeLatest(KnowledgeDetailTypes.FETCH_LATEST_FEEDBACKS_BY_KB_NUMBER, fetchLatestFeedbacksByKBNumber),
]
