import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { CharacterModel, CharacterSnapshotOut } from "../character/character"
import { CharacterApi } from "../../services/api/character-api"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Example store containing Rick and Morty characters
 */
export const CharacterStoreModel = types
  .model("CharacterStore")
  .props({
    characters: types.optional(types.array(CharacterModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveCharacters: (characterSnapshots: CharacterSnapshotOut[]) => {
      self.characters.replace(characterSnapshots)
    },
  }))
  .actions((self) => ({
    getCharacters: async () => {
      const characterApi = new CharacterApi(self.environment.api)
      const result = await characterApi.getCharacters()

      if (result.kind === "ok") {
        self.saveCharacters(result.characters)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

export interface CharacterStore extends Instance<typeof CharacterStoreModel> {}
export interface CharacterStoreSnapshotOut extends SnapshotOut<typeof CharacterStoreModel> {}
export interface CharacterStoreSnapshotIn extends SnapshotIn<typeof CharacterStoreModel> {}
export const createCharacterStoreDefaultModel = () => types.optional(CharacterStoreModel, {})
