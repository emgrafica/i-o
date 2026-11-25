import { select, put, call, takeLatest } from 'redux-saga/effects';
import { getWhatsnewItem } from '../../services/whatsnewService';
import WhatsnewAction from '../actions/whatsNewAction';
import { WhatsnewTypes} from '../actions/whatsNewAction';


export function* fetchWhatsnewListItem(action) {
    try {
        const result = yield call(getWhatsnewItem, action.currentUser);

        if (result.status === 200) {
            yield put(WhatsnewAction.fetchWhatsnewListItemSuccess(result.data));

        } else {
            throw new Error(result.error)
        }
    } catch (error) {
        yield put(WhatsnewAction.setWhatsNewErrorAction(error));
    }
}
export const watchWhatsnew = [
    takeLatest(WhatsnewTypes.FETCH_WHATSNEW_LIST_ITEM, fetchWhatsnewListItem),
]

