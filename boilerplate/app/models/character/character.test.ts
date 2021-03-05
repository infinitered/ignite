import { CharacterModel } from "./character"

test("can be created", () => {
  const instance = CharacterModel.create({})

  expect(instance).toBeTruthy()
})
