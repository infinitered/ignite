import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CharacterModel = types
  .model("Character")
  .props({
    id: types.identifier,
    name: types.maybe(types.string),
    status: types.maybe(types.string),
    image: types.maybe(types.string),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CharacterType = Instance<typeof CharacterModel>
export interface Character extends CharacterType {}
type CharacterSnapshotType = SnapshotOut<typeof CharacterModel>
export interface CharacterSnapshot extends CharacterSnapshotType {}
export const createCharacterDefaultModel = () => types.optional(CharacterModel, {})
