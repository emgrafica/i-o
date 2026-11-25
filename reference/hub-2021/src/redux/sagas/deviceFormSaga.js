import { call, put, select, takeLatest } from 'redux-saga/effects';
import { submitDeviceRequestForm } from '../../services/DeviceFormRequestService';
import { searchDeviceFormService } from '../../services/DeviceFormService';
import DeviceFormAction, { DeviceFormTypes } from '../actions/DeviceFormAction';

export function* handleDeviceFormStartFlow() {
  try {
      const deviceForm = yield select(state => {
        return state.deviceForm;
      });
      const result = yield call(searchDeviceFormService, deviceForm.typeForm);
      if (result.status === 200) {
        yield put(DeviceFormAction.setDeviceFormAction(result));

      } else {
        throw new Error(result.error)
      }
    } catch (error) {
        yield put(DeviceFormAction.setErrorAction(error));
    }
  } 


export function* handleDeviceFormSaveFlow(deviceFormReducer){
  try{
    const {deviceFormContent} = deviceFormReducer;

    deviceFormContent.deviceMarketplace.experience = 'PC Refresh';
    yield put(DeviceFormAction.setDeviceFormSetIsSpinning(true));
    const result = yield call(submitDeviceRequestForm, deviceFormContent);
    yield put(DeviceFormAction.setDeviceFormSetIsSpinning(false));

    if(result.status === 200){
      yield put(DeviceFormAction.setDeviceFormSubmittingResultAction(result));
      yield put(DeviceFormAction.setDeviceFormIsModalVisible(true));
      yield put(DeviceFormAction.setDeviceFormIsExceptionVisible(false));
      
    } else {
      yield put(DeviceFormAction.setDeviceFormIsModalVisible(false));
      yield put(DeviceFormAction.setDeviceFormIsExceptionVisible(true));

      throw new Error(result.error)
    }
  } catch(error){
    yield put(DeviceFormAction.setErrorAction(error));
  }
}


export const watchDeviceForm = [
  takeLatest(DeviceFormTypes.LOAD_DEVICE_FORM_ACTION, handleDeviceFormStartFlow),
  takeLatest(DeviceFormTypes.SAVE_DEVICE_FORM_ACTION, handleDeviceFormSaveFlow)
];

