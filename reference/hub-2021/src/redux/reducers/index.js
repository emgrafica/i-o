import { combineReducers } from 'redux';
import knowledgeReducer from './knowledgeReducer';
import myStuffReducer from './myStuffReducer';
import { routerReducer } from 'react-router-redux';
import supportHistoryReducer from './supportHistoryReducer';
import marketplaceDevicesReducer from './marketplaceDevicesReducer';
import marketplaceDeviceDetailReducer from './marketplaceDeviceDetailReducer';
import deviceFormReducer from './deviceFormReducer';
import knowledgeDetailReducer from './knowledgeDetailReducer';
import supportHistoryDetailReducer from './supportHistoryDetailReducer';
import whatsNewReducer from './whatsNewReducer';
import badWordsReducer from './badWordsReducer';

const rootReducer = combineReducers({
  router: routerReducer,
  knowledge: knowledgeReducer,
  knowledgeDetail: knowledgeDetailReducer,
  myStuff: myStuffReducer,
  supportHistory: supportHistoryReducer,
  supportHistoryDetail: supportHistoryDetailReducer,
  marketplaceDevices: marketplaceDevicesReducer,
  marketplaceDeviceDetail: marketplaceDeviceDetailReducer,
  deviceForm: deviceFormReducer,
  whatsNew: whatsNewReducer,
  badWords: badWordsReducer
});

export default rootReducer;
