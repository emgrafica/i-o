import { SupportHistoryDetailTypes } from 'redux/actions/supportHistoryDetailAction';

const defaultState = {
  isLoading: false,
  error: null,
  SHDetail: {},
  buttonValue: "",
  disabledComment: false,
  disabledBtn: false
};

export default (state = defaultState, action) => {
  const { SHDetail, error } = action;

  switch (action.type) {
    case SupportHistoryDetailTypes.LOAD_DATA:
      return {
        ...state,
        isLoading: true
      }
    
    case SupportHistoryDetailTypes.GET_SUPPORT_HISTORY_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        SHDetail
      }
    
    case SupportHistoryDetailTypes.SET_ERROR_ACTION:
      return {
        ...state,
        error
      }
  }
  return state;
};
