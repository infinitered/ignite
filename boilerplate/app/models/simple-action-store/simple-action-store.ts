import { Instance, SnapshotOut, types, getRoot } from 'mobx-state-tree'
import { ApiErrorModel } from '../api-error/api-error'
import { withEnvironment } from '../extensions/with-environment'
import { RootStore } from '../root-store/root-store'

/**
 * Model description here for TypeScript hints.
 */
export const SimpleActionStoreModel = types
  .model('SimpleActionStore')
  .props({
    loading: types.optional(types.boolean, false),
    error: types.maybeNull(ApiErrorModel),
    successMessage: types.maybeNull(types.string)
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    toggleLoading: () => {
      self.loading = !self.loading
    },
    setError: (error) => {
      if(error === null) {
        self.error = null
      }
      if (error?.error) {
        self.error = error
      }
      if(error?.kind === 'forbidden' || error?.kind === 'unauthorized') {
        const { authStore: { setConnection } }: RootStore = getRoot(self)
        setConnection(false)
      }
    },
    setSuccessMessage: (message) => {
      self.successMessage = message
    }
  })).actions((self) => ({
    reset: () => {
      self.setError(null)
      self.setSuccessMessage(null)
    }
  }))

type SimpleActionStoreType = Instance<typeof SimpleActionStoreModel>
export interface SimpleActionStore extends SimpleActionStoreType {}
type SimpleActionStoreSnapshotType = SnapshotOut<typeof SimpleActionStoreModel>
export interface SimpleActionStoreSnapshot extends SimpleActionStoreSnapshotType {}
export const createSimpleActionStoreDefaultModel = () => types.optional(SimpleActionStoreModel, {})
