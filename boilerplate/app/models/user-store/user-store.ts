import { Instance, SnapshotOut, types, getSnapshot, applySnapshot } from 'mobx-state-tree'
import { UserModel, User } from '../user/user'

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model('UserStore')
  .props({
    user: types.maybeNull(UserModel),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setUser: (user: User | null) => {
      self.user = user
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => {
    let initialState;
    return {
      afterCreate: () => {
        initialState = getSnapshot(self);
      },
      resetStore: () => {
        applySnapshot(self, initialState);
      }
    }
  })

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
