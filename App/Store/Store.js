import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../Reducers/'
import Config from '../Config/DebugSettings'

// create the logger
const logger = createLogger({
  predicate: (getState, { type }) => Config.reduxLogging
})

// a function which can create our store
export default () => createStore(
  rootReducer,
  applyMiddleware(logger)
)

