import test from 'ava'
import FixtureAPI from '../../App/Services/FixtureApi'
import { put, call } from 'redux-saga/effects'
import { getTemperature } from '../../App/Sagas/TemperatureSagas'
import TemperatureActions from '../../App/Redux/TemperatureRedux'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', (t) => {
  const step = stepper(getTemperature(FixtureAPI, {city: 'taco'}))
  // first yield is API
  t.deepEqual(step(), call(FixtureAPI.getCity, 'taco'))
})

test('success path', (t) => {
  const response = FixtureAPI.getCity('taco')
  const step = stepper(getTemperature(FixtureAPI, {city: 'taco'}))
  // first step API
  step()
  // Second step successful return and temperature
  t.deepEqual(step(response), put(TemperatureActions.temperatureSuccess(21, 'bonus')))
})

test('failure path', (t) => {
  const response = {ok: false}
  const step = stepper(getTemperature(FixtureAPI, {city: 'taco'}))
  // first step API
  step()
  // Second step failed response
  t.deepEqual(step(response), put(TemperatureActions.temperatureFailure()))
})
