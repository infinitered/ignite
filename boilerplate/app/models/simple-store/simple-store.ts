import { Instance, SnapshotOut, types, cast, getRoot } from 'mobx-state-tree'
import { ApiErrorModel } from '../api-error/api-error'
import { PaginationModel, Pagination } from '../pagination/pagination'
import { withEnvironment } from '../extensions/with-environment'
import { SimpleModel, Simple } from '../simple/simple'
import { RootStore } from '../root-store/root-store'

/**
 * Model description here for TypeScript hints.
 */
export const SimpleStoreModel = types
  .model('SimpleStore')
  .props({
    loading: types.optional(types.boolean, false),
    refreshing: types.optional(types.boolean, false),
    loadingMore: types.optional(types.boolean, false),
    detailsLoading: types.optional(types.boolean, false),
    detailsRefreshing: types.optional(types.boolean, false),
    details: types.maybeNull(SimpleModel),
    detailsError: types.maybeNull(ApiErrorModel),
    upsertLoading: types.optional(types.boolean, false),
    upsertError: types.maybeNull(ApiErrorModel),
    upsertsuccessMessage: types.maybeNull(types.string),
    error: types.maybeNull(ApiErrorModel),
    deleteLoading: types.optional(types.boolean, false),
    successMessage: types.maybeNull(types.string),
    list: types.maybeNull(types.array(SimpleModel)),
    pagination: types.maybeNull(PaginationModel)
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    toggleLoading: () => {
      self.loading = !self.loading
    },
    toggleRefreshing: () => {
      self.refreshing = !self.refreshing
    },
    toggleLoadingMore: () => {
      self.loadingMore = !self.loadingMore
    },
    toggleDeleteLoading: () => {
      self.deleteLoading = !self.deleteLoading
    },
    toggleUpsertLoading: () => {
      self.upsertLoading = !self.upsertLoading
    },
    setUpsertError: (error) => {
      if(error === null) {
        self.upsertError = null
      }
      if (error?.error) {
        self.upsertError = error
      }
      if(error?.kind === 'forbidden' || error?.kind === 'unauthorized') {
        const { authStore: { setConnection } }: RootStore = getRoot(self)
        setConnection(false)
      }
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
    setUpsertSuccessMessage: (messge: string | null) => {
      self.upsertsuccessMessage = messge
    },
    setSuccessMessage: (message: string | null) => {
      self.successMessage = message
    },
    pushItems: (items: any[] | null) => {
      if (self.pagination?.nextPage > 1) {
        self.list.push(...items)
      } else {
        self.list = cast(items)
      }
    },
    setList: (items: any[] | null) => {
      self.list = items ? cast(items) : null
    },
    pushItem: (item: Simple) => {
      if (self.list) {
        self.list.unshift(item)
      }
    },
    deleteItem: (id: number) => {
      const index = self.list.findIndex(item => id === item.id)
      self.list.splice(index, 1)
    },
    updateInListById: (item: Simple, id: number) => {
      if (self.list && self.list.length > 0) {
        const index = self.list.findIndex(item => id === item.id)
        if (index !== -1) {
          self.list[index] = item
        }
      }
    },
    setPagination: (pagination: Pagination | null) => {
      self.pagination = pagination
    },
    setDetails: (details) => {
      self.details = details
    },
    toggleDetailsLoading: () => {
      self.detailsLoading = !self.detailsLoading
    },
    toggleDetailsRefreshing: () => {
      self.detailsRefreshing = !self.detailsRefreshing
    },
    setDetailsError: (error) => {
      if(error === null) {
        self.upsertError = null
      }
      if (error?.error) {
        self.detailsError = error
      }
      if(error?.kind === 'forbidden' || error?.kind === 'unauthorized') {
        const { authStore: { setConnection } }: RootStore = getRoot(self)
        setConnection(false)
      }
    }
  }))
  .actions((self) => ({
    beforeFetchList: (refresh?) => {
      if(refresh) {
        self.setPagination(null)
        self.toggleRefreshing()
      } else if (self.pagination?.nextPage > 1) {
        self.toggleLoadingMore()
      } else {
        self.toggleLoading()
      }
    },
    afterFetchList: (refresh?) => {
      if(refresh) {
        self.toggleRefreshing()
      } else if (self.pagination?.nextPage > 1) {
        self.toggleLoadingMore()
      } else {
        self.toggleLoading()
      }
    },
    beforeFetchDetails: (refresh?) => {
      if(refresh) {
        self.toggleDetailsRefreshing()
      } else {
        self.toggleDetailsLoading()
      }
    },
    afterFetchDetails: (refresh?) => {
      if(refresh) {
        self.toggleDetailsRefreshing()
      } else {
        self.toggleDetailsLoading()
      }
    },
    resetList: () => {
      self.setList(null)
      self.setPagination(null)
    },
    resetUpsert: () => {
      self.setUpsertError(null)
      self.setUpsertSuccessMessage(null)
    },
    resetDetails: () => {
      self.setDetails(null)
      self.setDetailsError(null)
    }
  }))

type SimpleStoreType = Instance<typeof SimpleStoreModel>
export interface SimpleStore extends SimpleStoreType {}
type SimpleStoreSnapshotType = SnapshotOut<typeof SimpleStoreModel>
export interface SimpleStoreSnapshot extends SimpleStoreSnapshotType {}
export const createSimpleStoreDefaultModel = () => types.optional(SimpleStoreModel, {})
