import { take } from 'redux-saga/effects'
import Types from '../Actions/Types'

// process STARTUP actions
export function * watchStartup () {
  while (true) {
    yield take(Types.STARTUP)
  }
}
