import {all, fork} from 'redux-saga/effects';

import {watchKnowledge} from './knowledgeSaga.js';
import {watchMyStuff} from './myStuffSaga.js';
import {watchSupportHistory} from './supportHistorySaga.js';
import {watchMarketplaceDevices} from './MarketPlaceDevicesSaga.js';
import {watchDeviceForm} from './deviceFormSaga.js';
import {watchMarketplaceDeviceDetailById} from './MarketPlaceDeviceDetailById.js';
import {watchKnowledgeDetail} from './knowledgeDetailSaga';
import { watchSupportHistoryDetail } from './supportHistoryDetailSaga';
import { watchWhatsnew } from './whatsNewSaga';
import {watchBadWords} from './badWordsSaga';

export default function* rootSaga() {
      //console.log(">>>>>>>>>>>>>>>>>HANDLE_ROOT_SAGA<<<<<<<<<<<");
    yield all([
      fork(watchKnowledge),
      fork(watchMyStuff),
      fork(watchMarketplaceDevices),
      ...watchDeviceForm,
      fork(watchMarketplaceDeviceDetailById),
      ...watchKnowledgeDetail,
      ...watchSupportHistory,
      ...watchSupportHistoryDetail,
      ...watchWhatsnew,
      ...watchBadWords,
    ])
  }
