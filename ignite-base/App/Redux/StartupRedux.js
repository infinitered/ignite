// @flow

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  startup: null
})

export const StartupTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loadedFromStorage: false
})

/* ------------- Reducers ------------- */

// we just loaded from storage
export const startup = (state: Object) => state.merge({ loadedFromStorage: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startup
})

/* ------------- Selectors ------------- */

// Is storage loaded already?
export const isLoadedFromStorage = (startupState: Object) => startupState.loadedFromStorage
