import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../Reducers/'
import Config from '../Config/DebugSettings'
import sagaMiddleware from 'redux-saga'
import sagas from '../Sagas/'
import R from 'ramda'

// the logger master switch
const USE_LOGGING = Config.reduxLogging
// silence these saga-based messages
const BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED']
// creat the logger
const logger = createLogger({
  predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, BLACKLIST))
})

// a function which can create our store
export default () => createStore(
  rootReducer,
  applyMiddleware(
    logger,
    sagaMiddleware(...sagas)
  )
)
