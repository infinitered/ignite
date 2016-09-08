import { createTypes, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Action Types ------------- */

export const LoginTypes = createTypes(`
  LOGIN_REQUEST
  LOGIN_SUCCESS
  LOGIN_FAILURE
  LOGOUT
  `)

/* ------------- Action Creators ------------- */

export default {
  loginRequest: (username, password) => ({ type: LoginTypes.LOGIN_REQUEST, username, password }),
  loginSuccess: (username) => ({ type: LoginTypes.LOGIN_SUCCESS, username }),
  loginFailure: error => ({ type: LoginTypes.LOGIN_FAILURE, error }),
  logout: () => ({ type: LoginTypes.LOGOUT })
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
  [LoginTypes.LOGIN_REQUEST]: request,
  [LoginTypes.LOGIN_SUCCESS]: success,
  [LoginTypes.LOGIN_FAILURE]: failure,
  [LoginTypes.LOGOUT]: logout
})

/* ------------- Selectors ------------- */

// Is the current user logged in?
export const isLoggedIn = loginState => loginState.username !== null
