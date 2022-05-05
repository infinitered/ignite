import { Instance, SnapshotOut, types, getRoot } from 'mobx-state-tree'
import { remove } from '../../utils/storage'
import { ApiError } from '../api-error/api-error'
import { withEnvironment } from '../extensions/with-environment'
import { API_TOKEN_STORAGE_KEY } from '../../utils/features'
import { RootStore } from '../root-store/root-store'

/**
 * Model description here for TypeScript hints.
 */
export const AuthStoreModel = types
  .model('AuthStore')
  .props({
    isConnected: types.optional(types.boolean, false),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setConnection: async (isConnected: boolean) => {
      self.isConnected = isConnected
      if (!isConnected) {
        await remove(API_TOKEN_STORAGE_KEY)
      }
    },
  }) )
  .actions((self) => ({
    checkAuthByError: (error?: ApiError | any) => {
      if(error?.kind === 'forbidden' || error?.kind === 'unauthorized') {
        self.setConnection(false)
      }
    },
    checkAuth: async (onCheck?: () => void) => {
      const authApi = new AuthApi(self.environment.api)
      const result = await authApi.getUser()
      if (result.kind === 'ok') {
        const { userStore: { setUser } }: RootStore = getRoot(self)
        self.setConnection(true)
        setUser(result.user)
      } else if(result.kind === 'forbidden' || result.kind === 'unauthorized'){
        self.setConnection(false)
      }
      if(onCheck) onCheck()
    },
    signOut: async () => {
      const authApi = new AuthApi(self.environment.api)
      self.setConnection(false)
      const { userStore: { resetStore } }: RootStore = getRoot(self)
      resetStore()
      await authApi.signOut()
    },
  }))

type AuthStoreType = Instance<typeof AuthStoreModel>
export interface AuthStore extends AuthStoreType {}
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
