import { createStore, applyMiddleware, compose } from 'redux'
import { autoRehydrate } from 'redux-persist'
import createLogger from 'redux-logger'
import rootReducer from '../Reducers/'
import Config from '../Config/DebugSettings'
import createSagaMiddleware from 'redux-saga'
import sagas from '../Sagas/'
import R from 'ramda'
import RehydrationServices from '../Services/RehydrationServices'
import ReduxPersist from '../Config/ReduxPersist'
import Types from '../Actions/Types'

// only bring in Reactotron in dev mode
const createReactotronEnhancer = __DEV__ && require('reactotron-redux')

// the logger master switch
const USE_LOGGING = Config.reduxLogging
// silence these saga-based messages
const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE']
// creat the logger
const logger = createLogger({
  predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
})

let middleware = []
const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)

// Don't ship these
if (__DEV__) {
  middleware.push(logger)
}

// a function which can create our store and auto-persist the data
export default () => {
  // which enhancers we add are dynamic
  const enhancers = []

  // in dev, let's bring **START** with Reactotron's store enhancer
  if (__DEV__) {
    const reactotronEnhancer = createReactotronEnhancer(console.tron, {
      // you can flag some of your actions as important by returning true here
      isActionImportant: (action) => action.type === Types.STARTUP,

      // you can flag to completely ignore certain types too... especially the chatty ones
      ignore: [...SAGA_LOGGING_BLACKLIST]
    })
    enhancers.push(reactotronEnhancer)
  }

  // next bring in the middleware
  enhancers.push(applyMiddleware(...middleware))

  // add the autoRehydrate enhancer
  if (ReduxPersist.active) {
    enhancers.push(autoRehydrate())
  }

  // create the store!
  const store = createStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store)
  }

  // kick off root saga
  sagaMiddleware.run(sagas)

  return store
}
