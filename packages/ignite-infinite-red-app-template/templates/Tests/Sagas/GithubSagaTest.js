import test from 'ava'
import FixtureAPI from '../../App/Services/FixtureApi'
import { put, call } from 'redux-saga/effects'
import { getUserAvatar } from '../../App/Sagas/GithubSagas'
import GithubActions from '../../App/Redux/GithubRedux'
import { path } from 'ramda'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', (t) => {
  const step = stepper(getUserAvatar(FixtureAPI, {username: 'taco'}))
  // first yield is API
  t.deepEqual(step(), call(FixtureAPI.getUser, 'taco'))
})

test('success path', (t) => {
  const response = FixtureAPI.getUser('taco')
  const step = stepper(getUserAvatar(FixtureAPI, {username: 'taco'}))
  // first step API
  step()
  // Second step successful return
  const stepResponse = step(response)
  // Get the calculated temperature value from the fixture-based response
  const firstUser = path(['data', 'items'], response)[0]
  const avatar = firstUser.avatar_url
  t.deepEqual(stepResponse, put(GithubActions.userSuccess(avatar)))
})

test('failure path', (t) => {
  const response = {ok: false}
  const step = stepper(getUserAvatar(FixtureAPI, {username: 'taco'}))
  // first step API
  step()
  // Second step failed response
  t.deepEqual(step(response), put(GithubActions.userFailure()))
})
