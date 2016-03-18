import { take, put } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

// process STARTUP actions
export function * watchStartup () {
  while (true) {
    yield take(Types.STARTUP)
    yield put(Actions.requestTemperature('San Francisco'))
  }
}
