import {DEVICE_FORM_ACTION} from '../../constants'
import {DeviceFormTypes} from './../actions/DeviceFormAction';


const defaultState = {
    isLoading: true,
    error: null,
    data: [],
    typeForm: "",
    deviceFormSubmittingResultContent: null,
    isModalVisible: false,
    isExceptionVisible: false,
    isSpinning: false
  };

export default (state = defaultState, action) => {
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DEVICE_FORM_ACTION_REDUCER:state: " + state);
    // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DEVICE_FORM_ACTION_REDUCER:action: " + JSON.stringify(action));

    const {type, deviceForm, error, typeForm, deviceFormSubmittingResultContent} =  action;
    switch (type) {
        case DeviceFormTypes.LOAD_DEVICE_FORM_ACTION:
          return {
            ...state,
            isLoading: true,
            error: null,
            data: [],
            typeForm: typeForm
          }
        case DeviceFormTypes.SET_DEVICE_FORM_ACTION:
          return {
            ...state,
            isLoading: true,
            data: deviceForm.data
          }
          
        case DeviceFormTypes.SET_DEVICE_FORM_SUBMITTING_RESULT_ACTION:
          return {
            ...state,
            isLoading: true,
            deviceFormSubmittingResultContent: deviceFormSubmittingResultContent,
            isModalVisible: true,
            isExceptionVisible:false
          }
        
        case DeviceFormTypes.SET_DEVICE_FORM_CLOSE_POPUP:
          return {
            ...state,
            isModalVisible: action.isModalVisible,
            isExceptionVisible: action.isExceptionVisible,
        }
        case DeviceFormTypes.SET_DEVICE_FORM_IS_MODAL_VISIBLE:
          return {
            ...state,
            isModalVisible: action.isModalVisible,
        }
        case DeviceFormTypes.SET_DEVICE_FORM_IS_EXCEPTION_VISIBLE:
          return {
            ...state,
            isExceptionVisible: action.isExceptionVisible,
        }
        case DeviceFormTypes.SET_DEVICE_FORM_SET_IS_SPINNING:
          return {
            ...state,
            isSpinning: action.isSpinning,
        }
        
        case DeviceFormTypes.SET_DEVICE_FORM_ERROR_ACTION:
          return {
            ...state,
            isLoading: false,
            error: error,
            isExceptionVisible: true,
          }

      }
    return state;
}
