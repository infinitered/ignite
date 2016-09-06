import { put } from 'redux-saga/effects'
import { Actions as LoginActions } from '../Redux/LoginRedux'

// attempts to login
export function * login ({ username, password }) {
  if (password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(username))
  }
}
