import { AUTH } from './../../constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import badWordsAction, {BadWordsTypes} from './../actions/badWordsAction';


export function* handleLoadBadWordsStartFlow (){
    try{
        const badWords = yield select(state => {return state.badWords});

        if(badWords.data.length > 0) {
            return;
        }
        const settings = JSON.parse(localStorage.getItem(AUTH.SETTINGS));
        if(settings?.OFFENSIVE_WORD){
            yield put(badWordsAction.loadBadWordsAction(settings.OFFENSIVE_WORD));
        } else {
            throw new Error(result.error)
        }
    } catch(error){
        yield put(badWordsAction.setErrorAction(error))
    }
}

export const watchBadWords = [
    takeLatest(BadWordsTypes.LOAD_BAD_WORDS_SAGA_ACTION, handleLoadBadWordsStartFlow)
];