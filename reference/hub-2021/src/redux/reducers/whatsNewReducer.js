import {WhatsnewTypes} from './../actions/whatsNewAction';


const defaultState = {
    isLoading: false,
    error: null,
    whatsNewList: [],
  };

export default (state = defaultState, action) => {

    const {type, whatsNewList} =  action;
    switch (type) {
        case WhatsnewTypes.FETCH_WHATSNEW_LIST_ITEM:
          return {
            ...state,
            isLoading: true,
            error: null,
          }
        case WhatsnewTypes.FETCH_WHATSNEW_LIST_ITEM_SUCCESS:
          return {
            ...state,
            isLoading: false,
            whatsNewList: whatsNewList
          }
          
          case WhatsnewTypes.SET_WHATSNEW_ERROR_ACTION:
            return {
              ...state,
              isLoading: false,
              error: true
            }

      }
    return state;
}
