import test from 'ava'
import { take, call, put } from 'redux-saga/effects'
import { attemptLogin, watchLoginAttempt } from '../../App/Sagas/LoginSaga'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

const stepper = (fn) => (mock) => fn.next(mock).value

test('watcher', t => {
  const step = stepper(watchLoginAttempt())
  const mock = { username: 'steve', password: 'password' } // sample data

  t.deepEqual(step(), take(Types.LOGIN_ATTEMPT))
  t.deepEqual(step(mock), call(attemptLogin, mock.username, mock.password))
})

test('attemptLogin success', t => {
  const step = stepper(attemptLogin('a', 'b'))

  t.deepEqual(step(), put(Actions.loginSuccess('a')))
})

test('attemptLogin failure', t => {
  const step = stepper(attemptLogin('bad', ''))

  t.deepEqual(step(), put(Actions.loginFailure('WRONG')))
})
