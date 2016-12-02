import { call } from 'redux-saga/effects'
import { Actions as NavigationActions, ActionConst } from 'react-native-router-flux'
import { merge } from 'ramda'

// Process OPEN_SCREEN actions, intended for use with Reactotron to open a screen via a direct dispatch
export function * openScreen (action) {
  const {screen, options} = action
  // Always reset the nav stack when opening a screen via Reactotron
  // You can override the RESET type in the options passed to the OPEN_SCREEN dispatch
  const mergedOptions = merge({type: ActionConst.RESET}, options)
  yield call(NavigationActions[screen], mergedOptions)
}
