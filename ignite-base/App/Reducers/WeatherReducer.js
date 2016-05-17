import Types from '../Actions/Types'
import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  temperature: null,
  fetching: null,
  error: null,
  city: null
})

// request temp
const request = (state, action) =>
  state.merge({
    fetching: true,
    city: action.city,
    temperature: null
  })

// receive temp
const receive = (state, action) =>
  state.merge({
    fetching: false,
    error: null,
    temperature: action.temperature
  })

// temp failure
const failure = (state, action) =>
  state.merge({
    fetching: false,
    error: true,
    temperature: null
  })

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.TEMPERATURE_REQUEST]: request,
  [Types.TEMPERATURE_RECEIVE]: receive,
  [Types.TEMPERATURE_FAILURE]: failure
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
