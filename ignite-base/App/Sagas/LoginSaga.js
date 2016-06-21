import { take, put, call } from 'redux-saga/effects'
import Types from '../Actions/Types'
import Actions from '../Actions/Creators'

// attempts to login
export function * attemptLogin (username, password) {
  if (password === '') {
    // dispatch failure
    yield put(Actions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    yield put(Actions.loginSuccess(username))
  }
}

// a daemonized version which waits for LOGIN_ATTEMPT signals
export function * watchLoginAttempt () {
  // daemonize
  while (true) {
    // wait for LOGIN_ATTEMPT actions to arrive
    const { username, password } = yield take(Types.LOGIN_ATTEMPT)
    // call attemptLogin to perform the actual work
    yield call(attemptLogin, username, password)
  }
}
