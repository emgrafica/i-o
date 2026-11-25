import {select, put, call, takeLatest} from 'redux-saga/effects';
import {setMarketplaceDevicesDetailAction, setErrorAction} from '../actions/marketPlaceDevicesDetailAction';
import { getDeviceMarketPlaceDetail,getAllDevicesMarketPlace } from '../../services/marketplaceDevicesServices';
import {setMarketplaceDevicesAction} from '../actions/marketPlaceDevicesAction';
import {MARKETPLACE_DEVICES} from '../../constants';


export function* handleListMarketPlaceDeviceDetailStartFlow() {
    try {

      const marketplaceDevices = yield select(state => state.marketplaceDevices);
      const marketplaceDeviceDetail = yield select(state => state.marketplaceDeviceDetail);

      if(marketplaceDevices.data.length === 0) {
        const allDevices = yield call(getAllDevicesMarketPlace);
        if (allDevices.status === 200) {
          yield put(setMarketplaceDevicesAction(allDevices));
        }
      }

      const result = yield call(getDeviceMarketPlaceDetail, marketplaceDeviceDetail.params);
      
      if (result.status === 200) {
        yield put(setMarketplaceDevicesDetailAction(result));

      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      // yield put(setErrorAction(error));
        throw error;

    }
  }


export function* watchMarketplaceDeviceDetailById() {
    yield takeLatest(MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_BY_UID_START, handleListMarketPlaceDeviceDetailStartFlow)
}
