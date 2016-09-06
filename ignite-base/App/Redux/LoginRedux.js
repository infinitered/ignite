import { createTypes, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Action Types ------------- */

export const Types = createTypes(`
  LOGIN_REQUEST
  LOGIN_SUCCESS
  LOGIN_FAILURE
  LOGOUT
  `)

/* ------------- Action Creators ------------- */

export const Actions = {
  loginRequest: (username, password) => ({ type: Types.LOGIN_REQUEST, username, password }),
  loginSuccess: (username) => ({ type: Types.LOGIN_SUCCESS, username }),
  loginFailure: error => ({ type: Types.LOGIN_FAILURE, error }),
  logout: () => ({ type: Types.LOGOUT })
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username: null,
  error: null,
  fetching: false
})

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = state => state.merge({ fetching: true })

// we've successfully logged in
export const success = (state, { username }) =>
  state.merge({ fetching: false, error: null, username })

// we've had a problem logging in
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

// we've logged out
export const logout = state => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = loginState => loginState.username !== null
