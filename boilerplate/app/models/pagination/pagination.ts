import { Instance, SnapshotOut, types } from 'mobx-state-tree'

/**
 * Model description here for TypeScript hints.
 */
export const PaginationModel = types
  .model('Pagination')
  .props({
    nextPage: types.maybeNull(types.number)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type PaginationType = Instance<typeof PaginationModel>
export interface Pagination extends PaginationType {}
type PaginationSnapshotType = SnapshotOut<typeof PaginationModel>
export interface PaginationSnapshot extends PaginationSnapshotType {}
export const createPaginationDefaultModel = () => types.optional(PaginationModel, {})
