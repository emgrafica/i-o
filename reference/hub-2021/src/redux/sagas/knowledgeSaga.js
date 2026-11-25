import {select, put, call, takeLatest} from 'redux-saga/effects';
import {setKnowledgeAction, setErrorAction} from './../actions/knowledgeAction';
import { searchAllKnowledge } from './../../services/knowledgeServices';
import {KNOWLEDGE} from '../../constants';



function* handleListKnowledgeStartFlow() {
    //console.log(">>>>>>>>>>>>>>>>>HANDLE_SAGA_LIST_KNOWLEDGE_START<<<<<<<<<<<");
    try {
      const knowledgeParams = yield select(state => state.knowledge);
      const result = yield call(searchAllKnowledge, knowledgeParams.params);

      if (result.status === 200) {
        yield put(setKnowledgeAction(result));

      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      yield put(setErrorAction(error));
    }
  }


export function* watchKnowledge() {
    //console.log(">>>>>>>>>>>>>>>>>HANDLE_WATCH_KNOWLEDGE<<<<<<<<<<<");
    yield takeLatest(KNOWLEDGE.LIST_KNOWLEDGE_START, handleListKnowledgeStartFlow)
}

