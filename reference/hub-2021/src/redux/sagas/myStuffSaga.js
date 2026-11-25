import {select, put, call, takeLatest} from 'redux-saga/effects';
import  {setMyStuffAction, setErrorAction} from '../actions/myStuffAction';
import {MY_STUFF} from '../../constants';
// import { searchMyStuffByUserEmail } from './../../services/myStuffServices';
import { searchAllMyDevicesByUserId } from '../../services/myDevicesServices';



export function* handleMyStuffStartFlow() {
    //console.log(">>>>>>>>>>>>>>>>>HANDLE_SAGA_MY_STUFF_START<<<<<<<<<<<");
    try {
      const myStuff = yield select(state => state.myStuff);
      // const result = yield call(searchMyStuffByUserEmail, myStuff.userId);
      const result = yield call(searchAllMyDevicesByUserId, myStuff.userId);

      if (result.status === 200) {
        yield put(setMyStuffAction(result.data));

      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      yield put(setErrorAction(error));
    }
  }

  export function* watchMyStuff() {
    //console.log(">>>>>>>>>>>>>>>>>HANDLE_WATCH_MY_STUFF<<<<<<<<<<<");
    yield takeLatest(MY_STUFF.LIST_MY_STUFF_START, handleMyStuffStartFlow)
  }
