import { call, put, select, takeLatest } from "redux-saga/effects";
import SupportHistoryAction from '../actions/supportHistoryAction';
import { SupportHistoryTypes } from '../actions/supportHistoryAction';
import { searchSupportHistoryByUser } from "../../services/supportHistoryServices";
import { getTopKnowledgeArticleItem, getWhatsnewItem } from "../../services/whatsnewService";

export function* handleSupportHistoryStartFlow() {
  try {
    const supportHistory = yield select((state) => state.supportHistory);
    const result = yield call(
      searchSupportHistoryByUser,
      supportHistory.queryParams
    );

    if (result.status === 200) {
      yield put(SupportHistoryAction.setSupportHistoryAction(result.data));
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    yield put(SupportHistoryAction.setErrorAction(error));
  }
}


export function* fetchTopKnowledgeArticleItem() {
  try {
    const result = yield call(
      getTopKnowledgeArticleItem
    );

    if (result.status === 200) {
      yield put(SupportHistoryAction.fetchTopKnowledgeArticleItemSuccess(result.data.data));
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    yield put(SupportHistoryAction.setErrorAction(error));
  }
}

export function* fetchWhatsnewsItem(action) {
  try {
    const result = yield call(
      getWhatsnewItem,
      action.paramObj,
      action.maxItem
    );

    if (result.status === 200) {
      yield put(SupportHistoryAction.fetchWhatsnewsItemSuccess(result.data));
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    yield put(SupportHistoryAction.setErrorAction(error));
  }
}

export const watchSupportHistory = [
  takeLatest(
    SupportHistoryTypes.LOAD_SUPPORT_HISTORY_ACTION,
    handleSupportHistoryStartFlow
  ),
  takeLatest(
    SupportHistoryTypes.FETCH_TOP_KNOWLEDGE_ARTICLE_ITEM,
    fetchTopKnowledgeArticleItem
  ),
  takeLatest(
    SupportHistoryTypes.FETCH_WHATSNEWS_ITEM,
    fetchWhatsnewsItem
  )
];
