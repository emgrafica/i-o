import {select, put, call, takeLatest} from 'redux-saga/effects';
import {setMarketplaceDevicesAction, setErrorAction} from '../actions/marketPlaceDevicesAction';
import { getAllDevicesMarketPlace } from '../../services/marketplaceDevicesServices';
import {MARKETPLACE_DEVICES} from '../../constants';



export function* handleListMarketPlaceDevicesStartFlow() {
    try {
      const result = yield call(getAllDevicesMarketPlace);
      
      if (result.status === 200) {
        yield put(setMarketplaceDevicesAction(result));

      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      // yield put(setErrorAction(error));
        throw error;

    }
  }


export function* watchMarketplaceDevices() {
    yield takeLatest(MARKETPLACE_DEVICES.LIST_MARKETPLACE_DEVICES_START, handleListMarketPlaceDevicesStartFlow)
}
