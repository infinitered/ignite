import { CharacterModel } from "./character"

test("can be created", () => {
  const instance = CharacterModel.create({
    id: 1,
    name: "Rick Sanchez",
  })

  expect(instance).toBeTruthy()
})
