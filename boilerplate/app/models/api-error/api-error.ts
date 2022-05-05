import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const ApiErrorModel = types
  .model('ApiError')
  .props({
    error: types.maybe(types.string),
    kind: types.string
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setError: (error) => {
      self.error = error
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type ApiErrorType = Instance<typeof ApiErrorModel>
export interface ApiError extends ApiErrorType {}
type ApiErrorSnapshotType = SnapshotOut<typeof ApiErrorModel>
export interface ApiErrorSnapshot extends ApiErrorSnapshotType {}
export const createApiErrorDefaultModel = () => types.optional(ApiErrorModel, {})
