import test from 'ava'
import { take, call, put } from 'redux-saga/effects'
import { attemptLogin, watchLoginAttempt } from '../../App/Sagas/LoginSaga'
import Types from '../../App/Actions/Types'
import Actions from '../../App/Actions/Creators'

test('watcher', t => {
  const gen = watchLoginAttempt() // the test subject
  const next = (mock) => gen.next(mock).value // makes for nicer looking tests
  const mock = { username: 'steve', password: 'password' } // sample data

  t.deepEqual(next(), take(Types.LOGIN_ATTEMPT))
  t.deepEqual(next(mock), call(attemptLogin, mock.username, mock.password))
})

test('attemptLogin success', t => {
  const gen = attemptLogin('a', 'b')
  const next = (mock) => gen.next(mock).value

  t.deepEqual(next(), put(Actions.loginSuccess('a')))
})

test('attemptLogin failure', t => {
  const gen = attemptLogin('bad', '')
  const next = (mock) => gen.next(mock).value

  t.deepEqual(next(), put(Actions.loginFailure('WRONG')))
})
