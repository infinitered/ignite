import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Character, CharacterModel, CharacterSnapshot } from "../character/character"
import { CharacterApi } from '../../services/api/character-api';
import { GetCharactersResult } from "../../services/api";
import { withEnvironment } from "../extensions/with-environment";

/**
 * Model description here for TypeScript hints.
 */
export const CharacterStoreModel = types
  .model("CharacterStore")
  .props({
    characters: types.optional(types.array(CharacterModel), []),
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveCharacters: (characterSnapshots: CharacterSnapshot[]) => {
      const characterModels: Character[] = characterSnapshots.map((c) => CharacterModel.create(c)) // create model instances from the plain objects
      self.characters.replace(characterModels) // Replace the existing data with the new data
    },
  }))
  .actions(self => ({
    getCharacters: flow(function * () {
      const characterApi = new CharacterApi(self.environment.api)
      const result: GetCharactersResult = yield characterApi.getCharacters()

      if (result.kind === "ok") {
        self.saveCharacters(result.characters)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    })
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type CharacterStoreType = Instance<typeof CharacterStoreModel>
export interface CharacterStore extends CharacterStoreType {}
type CharacterStoreSnapshotType = SnapshotOut<typeof CharacterStoreModel>
export interface CharacterStoreSnapshot extends CharacterStoreSnapshotType {}
export const createCharacterStoreDefaultModel = () => types.optional(CharacterStoreModel, {})
