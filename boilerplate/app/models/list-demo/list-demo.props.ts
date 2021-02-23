import { Instance, types } from "mobx-state-tree"

// Define exactly response data what you need
export const DataUser = types.model({
  id: types.maybeNull(types.number),
  name: types.maybeNull(types.string),
  gender: types.maybeNull(types.string),
  image: types.maybeNull(types.string),
})

type DataUserType = Instance<typeof DataUser>
export interface DataUserProps extends DataUserType {}
