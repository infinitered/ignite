import test from 'ava'
import { put } from 'redux-saga/effects'
import { login } from '../../App/Sagas/LoginSagas'
import LoginActions from '../../App/Redux/LoginRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('success', (t) => {
  const mock = { username: 'a', password: 'b' }
  const step = stepper(login(mock))

  t.deepEqual(step(), put(LoginActions.loginSuccess(mock.username)))
})

test('failure', (t) => {
  const mock = { username: '', password: '' }
  const step = stepper(login(mock))

  t.deepEqual(step(), put(LoginActions.loginFailure('WRONG')))
})
