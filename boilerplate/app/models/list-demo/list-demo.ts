import { applySnapshot, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { DataUser, DataUserProps } from "./list-demo.props"
import { withEnvironment } from ".."
import * as Types from "../../services/api/api.types"

/**
 * Model description here for TypeScript hints.
 */
export const ListDemoModel = types
  .model("ListDemo")
  .extend(withEnvironment)
  .props({
    data: types.optional(types.array(DataUser), []),
    loading: false,
    page: 1,
    noMore: false,
  })
  .views((self) => ({
    get countData() {
      // Do the logic here, the data will auto notify to the view when changed
      return self.data.length
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getListUser: flow(function* () {
      const result: Types.GetListResult = yield self.environment.api.getListUser(self.page)
      if (result.kind === "ok") {
        const arrays = [...self.data, ...result.data?.results]
        self.data.replace(arrays)
      } else {
        self.noMore = true
      }
      self.loading = false
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    loadData: () => {
      applySnapshot(self.data, [])
      self.loading = true
      self.page = 1
      self.noMore = false
      self.getListUser()
    },
    onLoadmore: () => {
      self.loading = true
      self.page = self.page + 1
      self.getListUser()
    },
    removeItemData: (item: DataUserProps) => {
      self.data.remove(item)
    },
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ListDemoType = Instance<typeof ListDemoModel>
export interface ListDemo extends ListDemoType {}
type ListDemoSnapshotType = SnapshotOut<typeof ListDemoModel>
export interface ListDemoSnapshot extends ListDemoSnapshotType {}
export const createListDemoDefaultModel = () => types.optional(ListDemoModel, {})
