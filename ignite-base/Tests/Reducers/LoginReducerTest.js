import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/LoginRedux'

test('attempt', (t) => {
  const state = reducer(INITIAL_STATE, Actions.loginRequest('u', 'p'))

  t.true(state.fetching)
})

test('success', (t) => {
  const state = reducer(INITIAL_STATE, Actions.loginSuccess('hi'))

  t.is(state.username, 'hi')
})

test('failure', (t) => {
  const state = reducer(INITIAL_STATE, Actions.loginFailure(69))

  t.false(state.fetching)
  t.is(state.error, 69)
})

test('logout', (t) => {
  const loginState = reducer(INITIAL_STATE, Actions.loginSuccess('hi'))
  const state = reducer(loginState, Actions.logout())

  t.falsy(state.username)
})
