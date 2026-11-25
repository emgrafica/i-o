import {createActions} from 'reduxsauce';

const { Types, Creators}  = createActions({
    loadDeviceFormAction: ['typeForm'],
    setDeviceFormAction: ['deviceForm'],
    saveDeviceFormAction: ['deviceFormContent'],
    setDeviceFormSubmittingResultAction: ['deviceFormSubmittingResultContent'],
    setDeviceFormErrorAction: ['error'],
    setDeviceFormClosePopUp: ['isModalVisible', 'isExceptionVisible'],
    setDeviceFormIsModalVisible: ['isModalVisible'],
    setDeviceFormIsExceptionVisible: ['isExceptionVisible'],
    setDeviceFormSetIsSpinning: ['isSpinning']

})

export const DeviceFormTypes = Types;
export default Creators;
