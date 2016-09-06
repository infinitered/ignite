import { createTypes, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import I18n from 'react-native-i18n'

/* ------------- Action Types ------------- */

export const Types = createTypes(`
  TEMPERATURE_REQUEST
  TEMPERATURE_SUCCESS
  TEMPERATURE_FAILURE
  LOGOUT
  `)

/* ------------- Action Creators ------------- */

export const Actions = {
  requestTemperature: city => ({ type: Types.TEMPERATURE_REQUEST, city }),
  receiveTemperature: temperature => ({ type: Types.TEMPERATURE_SUCCESS, temperature }),
  receiveTemperatureFailure: () => ({ type: Types.TEMPERATURE_FAILURE })
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
  [Types.TEMPERATURE_REQUEST]: request,
  [Types.TEMPERATURE_SUCCESS]: success,
  [Types.TEMPERATURE_FAILURE]: failure
})

/* ------------- Helpers ------------- */

export const convertFromKelvin = kelvin => {
  const celcius = kelvin - 273.15
  const farenheit = (celcius * 1.8000) + 32

  if (I18n.t('tempIndicator') === 'F') {
    return Math.round(farenheit)
  } else {
    return Math.round(celcius)
  }
}
