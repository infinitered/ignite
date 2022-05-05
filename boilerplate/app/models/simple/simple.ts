import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const SimpleModel = types
  .model('Simple')
  .props({
    id: types.number
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type SimpleType = Instance<typeof SimpleModel>
export interface Simple extends SimpleType {}
type SimpleSnapshotType = SnapshotOut<typeof SimpleModel>
export interface SimpleSnapshot extends SimpleSnapshotType {}
export const createSimpleDefaultModel = () => types.optional(SimpleModel, {})
