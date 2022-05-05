import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const TermModel = types
  .model('Term')
  .props({
    id: types.maybeNull(types.integer),
    name: types.maybeNull(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TermType = Instance<typeof TermModel>
export interface Term extends TermType {}
type TermSnapshotType = SnapshotOut<typeof TermModel>
export interface TermSnapshot extends TermSnapshotType {}
export const createTermDefaultModel = () => types.optional(TermModel, {})