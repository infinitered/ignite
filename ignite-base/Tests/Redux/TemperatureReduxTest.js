import test from 'ava'
import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/TemperatureRedux'

test('request', (t) => {
  const cityName = 'someCity'
  const state = reducer(INITIAL_STATE, Actions.temperatureRequest(cityName))

  t.true(state.fetching)
  t.is(state.city, cityName)
  t.is(null, state.temperature)
})

test('success', (t) => {
  const cityTemp = 69
  const state = reducer(INITIAL_STATE, Actions.temperatureSuccess(cityTemp))

  t.false(state.fetching)
  t.is(state.temperature, cityTemp)
  t.is(null, state.error)
})

test('failure', (t) => {
  const state = reducer(INITIAL_STATE, Actions.temperatureFailure())

  t.false(state.fetching)
  t.true(state.error)
  t.is(null, state.temperature)
})
