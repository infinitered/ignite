import { CharacterStoreModel } from "./character-store"

test("can be created", () => {
  const instance = CharacterStoreModel.create({})

  expect(instance).toBeTruthy()
})
