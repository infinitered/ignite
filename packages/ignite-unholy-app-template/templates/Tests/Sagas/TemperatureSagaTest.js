import test from 'ava'
import FixtureAPI from '../../App/Services/FixtureApi'
import { put, call } from 'redux-saga/effects'
import { getTemperature } from '../../App/Sagas/TemperatureSagas'
import TemperatureActions from '../../App/Redux/TemperatureRedux'
import convertFromKelvin from '../../App/Transforms/ConvertFromKelvin'
import { path } from 'ramda'

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
  const stepResponse = step(response)
  // Get the calculated temperature value from the fixture-based response
  const kelvin = path(['data', 'main', 'temp_max'], response)
  const temperature = convertFromKelvin(kelvin)
  t.deepEqual(stepResponse, put(TemperatureActions.temperatureSuccess(temperature, 'bonus')))
})

test('failure path', (t) => {
  const response = {ok: false}
  const step = stepper(getTemperature(FixtureAPI, {city: 'taco'}))
  // first step API
  step()
  // Second step failed response
  t.deepEqual(step(response), put(TemperatureActions.temperatureFailure()))
})
