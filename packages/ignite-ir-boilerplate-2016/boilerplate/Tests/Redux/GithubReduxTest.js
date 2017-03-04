import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/GithubRedux'

test('request', (t) => {
  const username = 'taco'
  const state = reducer(INITIAL_STATE, Actions.userRequest(username))

  t.true(state.fetching)
  t.is(state.username, username)
  t.is(null, state.avatar)
})

test('success', (t) => {
  const avatar = 'http://placekitten.com/200/300'
  const state = reducer(INITIAL_STATE, Actions.userSuccess(avatar))

  t.false(state.fetching)
  t.is(state.avatar, avatar)
  t.is(null, state.error)
})

test('failure', (t) => {
  const state = reducer(INITIAL_STATE, Actions.userFailure())

  t.false(state.fetching)
  t.true(state.error)
  t.is(null, state.avatar)
})
