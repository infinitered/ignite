import ReduxPersist from '../Config/ReduxPersist'
import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
import StartupActions from '../Redux/StartupRedux'

const updateReducers = (store) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const config = ReduxPersist.storeConfig

  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      console.tron.display({
        name: 'PURGE',
        value: {
          'Old Version:': localVersion,
          'New Version:': reducerVersion
        },
        preview: 'Reducer Version Change Detected',
        important: true
      })
      // Purge store and dispatch startup
       persistStore(store, config,()=> {store.dispatch(StartupActions.startup())}).purge()
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    } else {
      persistStore(store, config,()=> {store.dispatch(StartupActions.startup())});
    }
  }).catch(() => {
    persistStore(store, config,()=> {store.dispatch(StartupActions.startup())});
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  })
}

export default {updateReducers}
