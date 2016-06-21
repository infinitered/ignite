import immutablePersistenceTransform from '../Store/ImmutablePersistenceTransform'
import { persistentStoreBlacklist } from '../Reducers/'
import { AsyncStorage } from 'react-native'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1',
  storeConfig: {
    storage: AsyncStorage,
    blacklist: persistentStoreBlacklist,
    transforms: [immutablePersistenceTransform]
  }
}

export default REDUX_PERSIST
