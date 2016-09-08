import { createTypes, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Action Types ------------- */

export const TemperatureTypes = createTypes(`
  TEMPERATURE_REQUEST
  TEMPERATURE_SUCCESS
  TEMPERATURE_FAILURE
  LOGOUT
  `)

/* ------------- Action Creators ------------- */

export default {
  requestTemperature: city => ({ type: TemperatureTypes.TEMPERATURE_REQUEST, city }),
  receiveTemperature: temperature => ({ type: TemperatureTypes.TEMPERATURE_SUCCESS, temperature }),
  receiveTemperatureFailure: () => ({ type: TemperatureTypes.TEMPERATURE_FAILURE })
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  temperature: null,
  fetching: null,
  error: null,
  city: null
})

/* ------------- Reducers ------------- */

// request the temperature for a city
export const request = (state, { city }) =>
  state.merge({ fetching: true, city, temperature: null })

// successful temperature lookup
export const success = (state, { temperature }) =>
  state.merge({ fetching: false, error: null, temperature })

// failed to get the temperature
export const failure = state =>
  state.merge({ fetching: false, error: true, temperature: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [TemperatureTypes.TEMPERATURE_REQUEST]: request,
  [TemperatureTypes.TEMPERATURE_SUCCESS]: success,
  [TemperatureTypes.TEMPERATURE_FAILURE]: failure
})
