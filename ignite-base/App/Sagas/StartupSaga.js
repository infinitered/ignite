import { take, put, select } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'
import R from 'ramda'

// process STARTUP actions
export function * watchStartup () {
  yield take(Types.STARTUP)
  const temp = yield select((state) => state.weather.temperature)
  // only fetch new temps when we don't have one yet
  if (!R.is(Number, temp)) {
    yield put(Actions.requestTemperature('San Francisco'))
  }
}
