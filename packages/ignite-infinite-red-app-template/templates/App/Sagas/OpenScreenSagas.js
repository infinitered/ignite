import { call } from 'redux-saga/effects'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'

// Process OPEN_SCREEN actions
export function * openScreen (action) {
  const {screen, options = {}} = action
  // Always reset the nav stack when opening a screen by default
  // You can override the RESET type in the options passed to the OPEN_SCREEN dispatch
  const mergedOptions = {type: ActionConst.RESET, ...options}
  yield call(NavigationActions[screen], mergedOptions)
}
