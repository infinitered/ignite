import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import createLogger from 'redux-logger'
import rootReducer, { persistentStoreBlacklist } from '../Reducers/'
import Config from '../Config/DebugSettings'
import sagaMiddleware from 'redux-saga'
import sagas from '../Sagas/'
import R from 'ramda'
import immutablePersistenceTransform from './ImmutablePersistenceTransform'
import Reactotron from 'reactotron'

// the logger master switch
const USE_LOGGING = Config.reduxLogging
// silence these saga-based messages
const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE']
// creat the logger
const logger = createLogger({
  predicate: (getState, { type }) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
})

let middleware = [sagaMiddleware(...sagas)]

// Don't ship these
if (__DEV__) {
  middleware.push[logger]
}

// a function which can create our store and auto-persist the data
export default () => {
  let store = {}

  // Add rehydrate enhancer if reduxPersist
  if (Config.reduxPersist) {
    const enhancers = compose(
      applyMiddleware(...middleware),
      Reactotron.storeEnhancer(),
      autoRehydrate()
    )

    store = createStore(
      rootReducer,
      enhancers
    )

    // configure persistStore
    persistStore(store, {
      storage: AsyncStorage,
      blacklist: persistentStoreBlacklist,
      transforms: [immutablePersistenceTransform]
    })
  } else {
    const enhancers = compose(
      applyMiddleware(...middleware),
      Reactotron.storeEnhancer()
    )

    store = createStore(
      rootReducer,
      enhancers
    )
  }

  return store
}
